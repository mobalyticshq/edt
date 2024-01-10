import {Strapi} from '@strapi/strapi';
import {StaticDataContainer, StaticDataType} from '../../common/data'
import {pluginId} from '../../common/pluginId';
import axios from "axios";
import {pathJoin} from "../../common/url";


export default ({strapi}: { strapi: Strapi }) => ({
    async getOptionsOfStaticDataType(typeName: string, filter?: string): Promise<StaticDataType[]> {
        const baseURL: string = strapi.plugin(pluginId).config("url")
        const url = pathJoin(baseURL, typeName)

        if (filter) {
            url.searchParams.set("namePrefix", filter)
        }

        strapi.log.debug(`Requested options for static data type ${typeName} from ${url.href}`)

        try {
            const resp = await axios.get(url.href)

            const data: StaticDataContainer = resp.data

            let options = data.descriptions

            options.sort(sortOptionsByName);

            return options
        } catch (error) {
            strapi.log.error(`Could not retrieve static data of type ${typeName} from ${url.href}`)
            return []
        }
    },

    getStaticDataTypes(): string[] {
        return strapi.plugin(pluginId).config('types')
    }
});

const sortOptionsByName = (a: StaticDataType, b: StaticDataType) => a.name.localeCompare(b.name)
