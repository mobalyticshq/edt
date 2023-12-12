import pluginPkg from '../../package.json';
import {pluginId, pluginName} from '../../common/pluginId';
import Initializer from './components/Initializer';
import {Enumeration} from '@strapi/icons';
import {getFetchClient} from '@strapi/helper-plugin';

const name = pluginPkg.strapi.name;

export default {
    async register(app: any) {

        const {get} = getFetchClient();
        const resp = await get(`/${pluginId}/types/`);

        resp.data.forEach((type: string) => {
            app.customFields.register({
                name: type,
                plugin: pluginName,
                pluginId: pluginId,
                icon: Enumeration,
                type: "string",
                intlLabel: {
                    id: `${type}.name.label`,
                    defaultMessage: type,
                },
                intlDescription: {
                    id: `${type}.name.description`,
                    defaultMessage: `Select any value of type ${type}`,
                },
                components: {
                    Input: async () =>
                        import(
                            "./components/Select"
                            ),
                },
            })
        })

        const plugin = {
            id: pluginId,
            initializer: Initializer,
            isReady: false,
            name,
        };

        app.registerPlugin(plugin);
    },
};
