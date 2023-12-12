import {Strapi} from '@strapi/strapi';
import pluginPkg from '../package.json';
import pluginId from "../common/pluginId";

export default ({strapi}: { strapi: Strapi }) => {
  const types: string[] = strapi.plugin(pluginId).config('types')

  types.forEach(type => {
    strapi.customFields.register({
      name: type,
      plugin: pluginPkg.name,
      type: 'string',
    });

    strapi.log.info(`server has registered static data type: ${type}`)
  })
};
