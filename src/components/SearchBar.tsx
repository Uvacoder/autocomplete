import React from "react";
import "./SearchBar.css";
import { SearchPreview } from "./SearchPreview";
import { SavedSearch } from "./SavedSearch";
import { useAutoComplete } from "./useAutoComplete";

export const SearchBar: React.FC<any> = () => {
  const { results, keyword, updateField, searching, savedKeywords } =
    useAutoComplete();
  const [showSavedKeywords, setShowSavedKeywords] = React.useState(false);

  const updateText = (text: any, update = false) => {
    setShowSavedKeywords(update);
    updateField("keyword", text, update);
    if (!update) {
      updateField("results", []);
    }
  };

  const cancelSearch = () => {
    setShowSavedKeywords(false);
    updateField("keyword", "");
  };

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
  // console.log(results);
  //renders our results using the SearchPreview component
  return (
    <div className="auto">
      <button
        onClick={() => cancelSearch()}
        className={`cancel-btn ${keyword.length > 0 ? "active" : "inactive"}`}
      >
        x
      </button>
      <input
        className="search-bar"
        placeholder="Search"
        value={keyword}
        onChange={(e) => updateField("keyword", e.target.value)}
        onKeyDown={(e) => {
          handleSavedListEvent(e);
        }}
        onMouseDown={(e) => {
          handleSavedListEvent(e);
        }}
      />
      {searching && <div className="loading">Searching...</div>}
      {!searching &&
        showSavedKeywords &&
        savedKeywords.length > 0 &&
        results.length === 0 && (
          <>
            <div className="search-results">
              <div className="search-title">Recent Search Queries</div>
              {savedKeywords.map((text: any, index: number) => {
                return (
                  <SavedSearch
                    key={`${text}-${index}`}
                    updateText={updateText}
                    index={index}
                    text={text}
                  />
                );
              })}
            </div>
          </>
        )}
      {results.length > 0 ? (
        <div className="search-results">
          <div className="search-title">Search Results</div>
          {results.map(({ position, name, age }: any, index: number) => {
            return (
              <SearchPreview
                key={index}
                updateText={updateText}
                index={index}
                position={position}
                name={name}
                age={age}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
