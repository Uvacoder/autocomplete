import "./SavedSearch.css";
export const SavedSearch: React.FC<any> = ({ text, index, updateQuery }) => {
  return (
    <div
      onClick={() => updateQuery(text, true)}
      className={`search-save ${index === 0 ? "start" : ""}`}
    >
      <div className="first">
        <p className="title">{text}</p>
      </div>
    </div>
  );
};
