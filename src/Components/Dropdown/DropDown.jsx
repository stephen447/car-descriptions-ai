const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  return (
    <>
      <label>{label}</label>
      <select>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              onClick={() => onSelectedChange(option)}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </>
  );
};
export default Dropdown;
