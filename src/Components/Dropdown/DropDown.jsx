import React from "react";

const Dropdown = ({
  options,
  selected,
  onSelectedChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex m-auto justify-center items-center">
      <label className="text-center">{label}</label>
      <select
        value={selected}
        onChange={(e) => onSelectedChange(e.target.value)} // Use onChange to get the selected value
        disabled={disabled}
        className="bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-6 ml-1 rounded shadow leading-tight focus:shadow-outline"
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
    </div>
  );
};

export default Dropdown;
