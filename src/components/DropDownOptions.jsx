const DropDownOptions = ({ title, options, selectedValue, handleSelected }) => {
  return (
    <div className="field">
      <span className="relative mr-2 field__label">{title}</span>
      <select
        name={"dropdown-" + title}
        value={selectedValue}
        className="border-[1px] border-slate-400 field__input"
        onChange={(e) => handleSelected(e.target.value)}
      >
        {options.map((item, index) => {
          return (
            <option value={item} key={index} className="px-2 py-1">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownOptions;
