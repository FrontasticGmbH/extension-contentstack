import {ContentstackEntry} from "@Types/content/ContentstackEntry";

export class ContentMapper {

  static contentstackEntryToContent(response: any ): unknown {

    console.log("Mapper: " + JSON.stringify(response));

    response = JSON.parse(JSON.stringify(response))
    delete response._version

    return response;
  }
}
