import React from "react";

const Input = ({ label, value, onChange, type = "text", min, max }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Corrected to pass a function
        min={min}
        max={max}
      />
    </div>
  );
};

export default Input;
