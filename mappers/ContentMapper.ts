
export class ContentMapper {

  static contentstackEntryToContent(response: any ): unknown {

    response = JSON.parse(JSON.stringify(response));
    delete response._version;
    delete response.created_at;
    delete response.created_by;
    delete response.updated_at;
    delete response.updated_by;
    delete response.publish_details;

    return response;
  }
}
