import { ActionContext, Request, Response } from '@frontastic/extension-types';
import { getLocale } from '../utils/Request';
import ContentApi from '../apis/ContentApi';

type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

export const getContent: ActionHook = async (request: Request, actionContext: ActionContext) => {

  if (!request.query.contentTypeUid) {
    return {
      body: 'Missing contentTypeUid',
      statusCode: 400,
    };
  }
  if (!request.query.entryUid) {
    return {
      body: 'Missing entryUid',
      statusCode: 400,
    };
  }

  const contentApi = new ContentApi(actionContext.frontasticContext, getLocale(request));
  const { entryUid, contentTypeUid } = request.query;

  const data = await contentApi.getContent({ contentTypeUid, entryUid });

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };

  return response;
};

export const getContentList: ActionHook = async (request: Request, actionContext: ActionContext) => {
  if (!request.query.contentTypeUid) {
    return {
      body: 'Missing contentTypeUid',
      statusCode: 400,
    };
  }

  const contentApi = new ContentApi(actionContext.frontasticContext, getLocale(request));
  const { limit, contentTypeUid } = request.query;

  const data = await contentApi.getContentList({ contentTypeUid, limit });

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };

  return response;
};
