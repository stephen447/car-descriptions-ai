import Dropdown from "../Dropdown/DropDown";
import OpenAIClient from "../OpenAI/OpenAIClient";
import React from "react";
import { useState } from "react";

// Manufacturers
// Models - - will need to do some kind of api call to get the models for the selected manufacturer
// Year
// Mileage
// Price
// Fuel Type
// Engine Size
// Transmission
// Body Style
// Color
// Interior Color
// Features
// Sun roof, alloy wheels, leather seats, navigations, carplay, android auto, heated seats, cooled seats, heated steering wheel, backup camera, parking sensors, blind spot monitoring, lane keep assist, adaptive cruise control, keyless entry, push button start, remote start, power tailgate, electric seats, memory seats, lumbar support, bluetooth, wifi, usb ports, wireless charging,

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <div>
      <h1>Home Page</h1>
      <Dropdown
        options={[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ]}
        label={"Manufacturer"}
        onSelectedChange={(option) => console.log(option)}
      />
      <OpenAIClient />
    </div>
  );
};
export default HomePage;
