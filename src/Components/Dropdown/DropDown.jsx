import React from "react";

const Dropdown = ({
  options,
  selected,
  onSelectedChange,
  label,
  disabled = false,
}) => {
  return (
    <>
      <label>{label}</label>
      <select
        value={selected}
        onChange={(e) => onSelectedChange(e.target.value)} // Use onChange to get the selected value
        disabled={disabled}
      >
        <option value="">Select a {label}</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Dropdown;
