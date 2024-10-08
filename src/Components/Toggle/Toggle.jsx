import React, { useState } from "react";

const Toggle = ({ label, onToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle(!isToggled); // Call the parent function to pass the toggle state
  };

  return (
    <div className="flex m-auto">
      <label style={{ marginRight: "10px" }}>{label}</label>
      <div
        onClick={handleToggle}
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: isToggled ? "green" : "grey",
          borderRadius: "25px",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: isToggled ? "calc(100% - 22px)" : "2px",
            transition: "left 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
