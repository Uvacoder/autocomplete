// src/mocks/handlers.js
import { rest } from "msw";

import DataJSON from './data/users.json';
let data = DataJSON;
const matchName = (name: string, keyword: string | any[]) => {
  var keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  //returns true only if we have a match and keyword isn't empty
  return name === keyword && keyLen !== 0;
};

export const handlers = [
  // Handles a POST /login request
  rest.get("https://my-api.herokuapp.com/search", (req, res, ctx) => {
    const searchValue = req.url.searchParams.get("query");
    const text = searchValue ? searchValue : "";
    let results: any[] = [];
    if (text !== "") {
      results = data.filter(
        (item) => true === matchName(item.name, text.toLowerCase())
      );
    }

    return res(ctx.json(results));
  }),
];
