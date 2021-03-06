/* eslint-disable import/first */
import './config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from 'components/App';
import Html from 'components/Html';
import PrettyError from 'pretty-error';
// import nodeFetch from 'node-fetch';
import { EventEmitter } from 'events';

import router from './router';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
// import createFetch from './createFetch';
import configureStore from './store/configureStore';
// import { setRuntimeVariable } from './actions/runtime';
// import { getUserInfo } from './actions/user';
import { runtime, userinfo } from './actions';

const logger = console;
const COOKIE_NAME = 'X-Access-Token';
// const isDebug = process.env.NODE_ENV === 'development';
const env = {};
Object.keys(process.env).forEach(key => {
  if (/^BOXLINKER_/.test(key)) {
    env[key] = process.env[key];
  }
});

logger.info('env: \n', env);

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    const visitLoginReg =
      req.path === '/login' ||
      req.path === '/reg' ||
      req.path === '/pass-forgot';
    const token = req.cookies[COOKIE_NAME] || req.query.access_token;
    const initialState = {};
    const store = configureStore(initialState, {});
    store.dispatch(runtime('initialNow', Date.now()));
    await store.dispatch(userinfo(token));
    const user = store.getState().userinfo;
    const authOk = user && user.id;
    if (authOk) {
      if (visitLoginReg) {
        logger.log('visit login|reg when logged -> ', authOk);
        res.redirect('/');
        return;
      }
    } else if (!visitLoginReg) {
      res.clearCookie(COOKIE_NAME);
      res.redirect('/login');
      return;
    }
    const context = {
      event: new EventEmitter(),
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      getUrlParameter(name) {
        return req.query[name];
      },
      getUrlPath() {
        return req.path;
      },
      // Universal HTTP client
      // fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );

    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      env,
      // COOKIE_DOMAIN: env.BOXLINKER_COOKIE_DOMAIN,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.msg}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(500);
  res.send(`<!doctype html>${html}`);
});

// Launch server
if (!module.hot) {
  app.listen(process.env.BOXLINKER_PORT, () => {
    console.info(
      `The server is running at http://${process.env.BOXLINKER_PORT}/`,
    );
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
