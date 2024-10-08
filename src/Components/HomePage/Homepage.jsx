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
  const [mileage, setMileage] = useState(0);
  const [condition, setCondition] = useState();
  const [transmission, setTransmission] = useState();
  const [fuelType, setFuelType] = useState();
  const [engineSize, setEngineSize] = useState();
  const [bodyStyle, setBodyStyle] = useState();
  const [color, setColor] = useState();
  const [interiorColor, setInteriorColor] = useState();
  const [ServiceHistory, setServiceHistory] = useState();
  const [Tax, setTax] = useState();
  const [NCT, setNCT] = useState();

  const fuelOptions = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissionOptions = ["Automatic", "Manual"];
  const conditionOptions = ["New", "Very Good", "Good", "Fair", "Poor"];
  const bodyStyleOptions = [
    "Saloon",
    "SUV",
    "Van",
    "Coupe",
    "Convertible",
    "Hatchback",
  ];
  const colorOptions = [
    "White",
    "Black",
    "Silver",
    "Red",
    "Blue",
    "Green",
    "Grey",
    "Gold",
    "Orange",
    "Yellow",
  ];

  const interiorColorOptions = [
    "Black",
    "Grey",
    "Beige",
    "Brown",
    "White",
    "Blue",
    "Orange",
    "Red",
  ];

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
    const prompt = `I am selling a ${year} ${manufacturer} ${model}, the exterior color is ${color} and the interior color is ${interiorColor} the mileage is ${mileage} kimometers, the condition is ${condition}, it has an ${transmission} transmissions and a ${fuelType} ${engineSize} liter engine,  can you make me a description for car selling website carzone?`;
    setPrompt(prompt);
    console.log("Prompt: ", prompt);
  }, [
    manufacturer,
    model,
    year,
    mileage,
    condition,
    transmission,
    fuelType,
    color,
    interiorColor,
    engineSize,
  ]);

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
        options={conditionOptions}
        label={"Condition"}
        onSelectedChange={setCondition}
      />
      <Dropdown
        options={transmissionOptions}
        label={"Transmission"}
        onSelectedChange={setTransmission}
      />
      <Dropdown
        options={fuelOptions}
        label={"Fuel Type"}
        onSelectedChange={setFuelType}
      />
      <Dropdown
        options={bodyStyleOptions}
        label={"Body Style"}
        onSelectedChange={setBodyStyle}
      />
      <Dropdown
        options={colorOptions}
        label={"Color"}
        onSelectedChange={setColor}
      />
      <Dropdown
        options={interiorColorOptions}
        label={"Interior Color"}
        onSelectedChange={setInteriorColor}
      />

      <Input
        label={"Year"}
        type={"number"}
        min={1960}
        max={2025}
        value={year}
        onChange={setYear}
      />
      <Input
        label={"Mileage"}
        type={"number"}
        min={0}
        max={999999}
        value={mileage}
        onChange={setMileage}
      />
      <Input
        label={"Engine Size"}
        type={"number"}
        min={0}
        max={10}
        value={engineSize}
        onChange={setEngineSize}
      />

      <OpenAIClient />
    </div>
  );
};
export default HomePage;
