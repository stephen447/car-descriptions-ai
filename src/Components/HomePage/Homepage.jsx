import Dropdown from "../Dropdown/DropDown";
import OpenAIClient from "../OpenAI/OpenAIClient";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../Toggle/Toggle";
import Input from "../Input/Input";

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
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [features, setFeatures] = useState({
    sunroof: false,
    leatherSeats: false,
    bluetooth: false,
    heatedSeats: false,
    parkingSensors: false,
  });

  useEffect(() => {
    const getModels = async () => {
      try {
        if (manufacturer !== undefined) {
          const response = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
              `adverts/models?manufacturer=${manufacturer}`
          );
          const newModelOptions = response.data;
          //setModelOptions(newModelOptions);
          //setDisableModeloptions(newModelOptions.length === 0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log("Manufacturer: ", manufacturer);
    console.log("Year: ", year);
    //getModels();
  }, [manufacturer, year]);

  useEffect(() => {
    const prompt = `I am selling a ${year} ${manufacturer} ${model}, can you make me a description?`;
    setPrompt(prompt);
    console.log("Prompt: ", prompt);
  }, [manufacturer, model, year]);
  return (
    <div>
      <h1>Home Page</h1>
      <Dropdown
        options={["Toyota", "BMW", "Audi"]}
        label={"Manufacturer"}
        onSelectedChange={setManufacturer}
      />
      <Dropdown
        options={["Corolla", "Camry", "RAV4"]}
        label={"Model"}
        onSelectedChange={setModel}
      />
      <Dropdown
        options={["Corolla", "Camry", "RAV4"]}
        label={"Model"}
        onSelectedChange={setModel}
      />
      <Input
        label={"Year"}
        type={"number"}
        min={1960}
        max={2025}
        value={year}
        onChange={setYear}
      />

      <OpenAIClient />
    </div>
  );
};
export default HomePage;
