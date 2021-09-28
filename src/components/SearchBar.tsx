import "./SearchBar.css";
import { SearchPreview } from "./SearchPreview";
import { useAutoComplete } from "./useAutoComplete";

export const SearchBar: React.FC<any> = () => {
  const { results, keyword, updateField, searching } = useAutoComplete();

  const updateText = (text: any) => {
    updateField("keyword", text, false);
    updateField("results", []);
  };

  const cancelSearch = () => {
    updateField("keyword", "");
  };

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
      />
      {searching && <div className="loading">Searching...</div>}
      {results.length > 0 ? (
        <div className="search-results">
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
