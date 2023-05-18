import { Context } from '@frontastic/extension-types';
import * as Contentstack from 'contentstack';
import { ContentMapper } from '../mappers/ContentMapper';

export default class ContentApi {
  private stack: Contentstack.Stack;
  private locale: string;

  constructor(frontasticContext: Context, locale?: string) {
    this.locale = (locale ?? frontasticContext.project.defaultLocale).replace('_', '-');

    const api_key = frontasticContext.project.configuration?.contentstack.apiKey;
    const delivery_token = frontasticContext.project.configuration?.contentstack.deliveryToken;
    const environment_name = frontasticContext.project.configuration?.contentstack.environment;
    const region = frontasticContext.project.configuration?.contentstack.region;

    // Initialize the Contentstack Stack
    this.stack = Contentstack.Stack(api_key, delivery_token, environment_name, region);
  }

  async getContent({ contentTypeUid, entryUid }: any) {
    const Query = this.stack.ContentType(contentTypeUid).Entry(entryUid);

    return await Query.fetch().then(
      function success(entry) {
        return ContentMapper.contentstackEntryToContent(entry);
      },
      function error(err) {
        console.log('Failed to fetch ContentStack entry, Error log: ' + err);
        return { err };
      },
    );
  }

  async getContentList({ contentTypeUid, limit }: any) {
    const dataQuery = this.stack.ContentType(contentTypeUid).Query();
    const Query = dataQuery.limit(parseInt(limit)).find();
    return await Query.then(
      function success(entries) {
        return entries[0].map((entry: any) => ContentMapper.contentstackEntryToContent(entry));
      },
      function error(err) {
        console.log('Failed to fetch ContentStack entries, Error log: ' + err);
        return { err };
      },
    );
  }
}
