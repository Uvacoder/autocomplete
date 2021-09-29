import "./SavedSearch.css";
export const SavedSearch: React.FC<any> = ({ text, index, updateText }) => {
  return (
    <div
      onClick={() => updateText(text,true)}
      className={`search-save ${index === 0 ? "start" : ""}`}
    >
      
      <div className="first">
        <p className="title">{text}</p>
      </div>
    </div>
  );
};
