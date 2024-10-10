import React from "react";

const Input = ({ label, value, onChange, type = "text", min, max }) => {
  return (
    <div className="items-center mb-3 m-auto">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Corrected to pass a function
        min={min}
        max={max}
        className="bg-slate-400 border text-center border-gray-400 hover:border-gray-500 px-4 py-2 pr-4 ml-2 rounded-lg shadow leading-tight focus:shadow-outline"
      />
    </div>
  );
};

export default Input;
