export default [
  {
    method: 'GET',
    path: '/types/:type/options',
    handler: 'staticData.options',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/types/',
    handler: 'staticData.list',
    config: {
      auth: false,
      policies: [],
    },
  },
];
