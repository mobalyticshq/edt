import {Strapi} from '@strapi/strapi';
import StaticDataType from '../../common/data'
import {pluginId} from '../../common/pluginId';
import axios from "axios";
import {pathJoin} from "../../common/url";


export default ({strapi}: { strapi: Strapi }) => ({
  async getOptionsOfStaticDataType(typeName: string): Promise<StaticDataType[]> {
    const baseURL: string = strapi.plugin(pluginId).config("url")
    const url = pathJoin(baseURL, typeName)

    strapi.log.debug(`Requested options for static data type ${typeName} from ${url}`)

    try {
      const resp = await axios.get(url)

      let options = resp.data

      options.sort(sortOptionsByName);

      return options
    } catch (error) {
      strapi.log.error(`Could not retrieve static data of type ${typeName} from ${url}`)
      return []
    }
  },

  getStaticDataTypes(): string[] {
    return strapi.plugin(pluginId).config('types')
  }
});

const sortOptionsByName = (a: StaticDataType, b: StaticDataType) => a.label.localeCompare(b.label)
