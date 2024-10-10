import React from "react";

const Dropdown = ({
  options,
  selected,
  onSelectedChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex mb-3 m-auto justify-center items-center">
      <label className="text-center m-3">{label}</label>
      <select
        value={selected}
        onChange={(e) => onSelectedChange(e.target.value)} // Use onChange to get the selected value
        disabled={disabled}
        required
        className="bg-slate-400 border border-gray-400 text-center hover:border-gray-500 px-4 py-2  ml-1 rounded-lg shadow leading-tight focus:shadow-outline"
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
