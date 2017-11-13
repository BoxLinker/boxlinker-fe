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
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'services' */ './services/list'),
        },
        {
          path: '/create',
          load: () =>
            import(/* webpackChunkName: 'createService' */ './services/create'),
        },
        {
          path: '/:name/get',
          load: () =>
            import(/* webpackChunkName: 'getService' */ './services/detail'),
        },
      ],
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
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/reg',
      load: () => import(/* webpackChunkName: 'reg' */ './reg'),
    },
    {
      path: '/forgot',
      load: () => import(/* webpackChunkName: 'forgot' */ './forgot'),
    },
    {
      path: '/demo',
      load: () => import(/* webpackChunkName: 'demo' */ './demo'),
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
