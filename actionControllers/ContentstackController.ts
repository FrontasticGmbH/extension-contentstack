import { ActionContext, Request, Response } from '@frontastic/extension-types/src/ts/index';
import { getLocale } from '../utils/Request';
import ContentApi from '../apis/ContentApi';

type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

export const getContent: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const contentApi = new ContentApi(actionContext.frontasticContext, getLocale(request));
  const contentTypeUid = request.query.contentTypeUid;
  const entryUid = request.query.entryUid;

  const data = await contentApi.getContent({ contentTypeUid, entryUid });

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };

  return response;
};
