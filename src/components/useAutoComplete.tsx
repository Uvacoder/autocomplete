// Credits : https://github.com/pacosw1/react-autocomplete

import React from "react";
import { useDebouncedCallback } from "use-debounce";

export const useAutoComplete = (minKeywordLenght = 3,saveQueryLength = 5) => {
  const [keyword, setKeyword] = React.useState<string>("");
  const [results, setResults] = React.useState<any[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [savedKeywords,setSavedKeywords] = React.useState<string[]>([]);

  const updateField = (field: any, value: any, update = true) => {
    if (update) onSearch(value);
    if (field === "keyword") {
      setKeyword(value);
    } else if (field === "results") {
      setResults(value);
    }
  };

  const onSearch = useDebouncedCallback(async (text: string) => {
    let results: any[] = [];
    if (text !== "") {
      try {
        setSearching(true);
        setSavedKeywords(keywords => {
          if(text.length < minKeywordLenght || keywords.includes(text)){
            return keywords;
          }
          return [text,...keywords].slice(0,saveQueryLength);
        });
        const data = await fetch(
          `https://my-api.herokuapp.com/search?query=${text}`
        );
        results = await data.json();
      } catch (err) {
        console.log((err as any).message);
      }
    }
    setResults(results);
    setSearching(false);
  }, 500);

  return { results, keyword, updateField, searching,savedKeywords };
};
