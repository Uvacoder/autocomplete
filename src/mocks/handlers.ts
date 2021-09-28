// src/mocks/handlers.js
import { rest } from "msw";

const data = [
  { name: "Andrew R. Kelly", age: 22, position: "Janitor" },
  { name: "Adrian Sanchez", age: 30, position: "Teacher" },
  { name: "Anderson Brown", age: 25, position: "Principal" },
  { name: "Anna Valio", age: 30, position: "guidance councelor" },
  { name: "Asha Mathews", age: 50, position: "Teacher" },
  { name: "Alicia keys", age: 25, position: "Librarian" },
  { name: "Alexa Dot", age: 30, position: "teacher" },
  { name: "Bob Squarepants", age: 20, position: "secretary" },
];

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
