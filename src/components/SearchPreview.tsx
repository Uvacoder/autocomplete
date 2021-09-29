import "./SearchPreview.css";
export const SearchPreview: React.FC<any> = ({
  age,
  name,
  position,
  index,
  updateText,
}) => {
  return (
    <div
      onClick={() => updateText(name)}
      className={`search-preview ${index === 0 ? "start" : ""}`}
    >
      <div className="first">
        <p className="name">{name}</p>
        <p className="position">{position}</p>
      </div>
      <div className="second">
        <p className="age">{age}</p>
        <p className="position">age</p>
      </div>
    </div>
  );
};
