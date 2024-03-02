const DropDownOptions = ({ title, options, selectedValue, handleSelected }) => {
  return (
    <div className="flex items-center">
      <span className="relative mr-2">{title}:</span>
      <select
        name={"dropdown-" + title}
        id=""
        value={selectedValue}
        className="border-[1px] border-slate-400"
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
      {/* <button className="btn btn-slate">Add Property</button> */}
    </div>
  );
};

export default DropDownOptions;
