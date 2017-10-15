/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '/',
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
    },
    {
      path: '/applications',
      load: () =>
        import(/* webpackChunkName: 'applications' */ './applications'),
    },
    {
      path: '/services',
      load: () => import(/* webpackChunkName: 'services' */ './services'),
    },
    {
      path: '/volumes',
      load: () => import(/* webpackChunkName: 'volumes' */ './volumes'),
    },
    {
      path: '/images',
      load: () => import(/* webpackChunkName: 'images' */ './images'),
    },
    {
      path: '*',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],
  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();
    // Provide default values for title, description etc.
    route.title = `${route.title || '控制台'} - BoxLinker`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
