import { Context } from '@frontastic/extension-types';
import * as Contentstack from 'contentstack';
import { ContentMapper } from '../mappers/ContentMapper';

export default class ContentApi {
  private stack:  Contentstack.Stack;
  private locale: string;

  constructor(frontasticContext: Context, locale?: string) {
    this.locale = (locale ?? frontasticContext.project.defaultLocale).replace('_', '-');

    const api_key = frontasticContext.project.configuration.contentstack.apiKey;
    const delivery_token = frontasticContext.project.configuration.contentstack.deliveryToken;
    const environment_name = frontasticContext.project.configuration.contentstack.environmentName;

    // Initialize the Contentstack Stack
    this.stack = Contentstack.Stack(api_key, delivery_token, environment_name);

  }

  async getContent() {

    const Query = this.stack.ContentType('testcontent').Entry("bltbe0c314cf4e8389d");
    let response = null;
    Query.fetch()
      .then(function success(entry) {
        console.log(entry.get('title')); // Retrieve field value by providing a field's uid
        response = entry
      }, function error(err) {
        // err object
      });

    return ContentMapper.contentstackEntryToContent();
  }
}
