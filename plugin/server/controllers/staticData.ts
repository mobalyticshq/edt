import {Strapi} from '@strapi/strapi';
import {pluginId} from '../../common/pluginId';

export default ({strapi}: { strapi: Strapi }) => ({
  async options(ctx) {
    const {type} = ctx.params;

    ctx.body = await strapi
      .plugin(pluginId)
      .service('staticData')
      .getOptionsOfStaticDataType(type);
  },

  list(ctx) {
    ctx.body = strapi
      .plugin(pluginId)
      .service('staticData')
      .getStaticDataTypes();
  },
});
