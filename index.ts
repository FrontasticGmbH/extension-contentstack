import { Context, ExtensionRegistry } from '@frontastic/extension-types';
import ContentApi from './apis/ContentApi';
import { getLocale } from './utils/Request';

export default {
  'data-sources': {
    'contentstack/content': async (config, context) => {
      const contentApi = new ContentApi(context.frontasticContext as Context, getLocale(context.request));

      const { contentId } = config.configuration;

      const payload = await contentApi.getContent();

      return {
        dataSourcePayload: payload,
      };
    }
  },
} as ExtensionRegistry;
