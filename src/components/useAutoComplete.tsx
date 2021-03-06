// Credits : https://github.com/pacosw1/react-autocomplete

import React from "react";
import { useDebouncedCallback } from "use-debounce";

export const useAutoComplete = (minKeywordLenght = 3, saveQueryLength = 5) => {
  const [keyword, setKeyword] = React.useState<string>("");
  const [results, setResults] = React.useState<any[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [savedKeywords, setSavedKeywords] = React.useState<string[]>([]);
  const [showSavedKeywords, setShowSavedKeywords] = React.useState(false);

  const handleSavedListEvent = (
    e:
      | React.MouseEvent<HTMLInputElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.type === "mousedown" ||
      (e as React.KeyboardEvent)?.key === "ArrowDown"
    ) {
      setShowSavedKeywords(true);
    }
  };

  const updateQuery = (query: string, update = false) => {
    setShowSavedKeywords(update);
    updateField("keyword", query, update);
    if (!update) {
      updateField("results", []);
    }
  };

  const cancelSearch = () => {
    setShowSavedKeywords(false);
    updateField("keyword", "");
  };

  const updateField = async (field: any, value: any, update = true) => {
    if (update) await onSearch(value);
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
        const data = await fetch(
          `https://my-api.herokuapp.com/search?query=${text}`
        );
        results = await data.json();
        if (results.length > 0) {
          setSavedKeywords((keywords) => {
            if (text.length < minKeywordLenght || keywords.includes(text)) {
              return keywords;
            }
            return [text, ...keywords].slice(0, saveQueryLength);
          });
        }
      } catch (err) {
        console.log((err as any).message);
      }
    }
    setResults(results);
    setSearching(false);
  }, 500);

  return {
    results,
    keyword,
    searching,
    savedKeywords,
    showSavedKeywords,
    updateQuery,
    cancelSearch,
    updateField,
    handleSavedListEvent,
  };
};
