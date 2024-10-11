import Dropdown from "../Dropdown/DropDown";
import React from "react";
import { useState, useEffect } from "react";
import Toggle from "../Toggle/Toggle";
import Input from "../Input/Input";
import Output from "../Output/Output";
import OpenAI from "openai";

// Open AI Client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const HomePage = () => {
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [carData, setCarData] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [modelsEnabled, setModelsEnabled] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2025);
  const [mileage, setMileage] = useState(0);
  const [condition, setCondition] = useState();
  const [transmission, setTransmission] = useState();
  const [fuelType, setFuelType] = useState();
  const [engineSize, setEngineSize] = useState(1.0);
  const [bodyStyle, setBodyStyle] = useState();
  const [color, setColor] = useState();
  const [interiorColor, setInteriorColor] = useState();
  const [displayFeatureToggles, setDisplayFeatureToggles] = useState(false);
  const [Tax, setTax] = useState();
  const [NCT, setNCT] = useState();
  const [PreviousOwners, setPreviousOwners] = useState();
  const [descriptionsGenerated, setDescriptionsGenerated] = useState(0);
  const [description, setDescription] = useState();

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    heatedSteeringWheel: false,
    carplay: false,
    androidAuto: false,
    reverseCamera: false,
    blindSpotMonitoring: false,
    laneKeepAssist: false,
    adaptiveCruiseControl: false,
    keylessEntry: false,
    metallicPaint: false,
    electricSeats: false,
    memorySeats: false,
    lumbarSupport: false,
    LEDLights: false,
    alloyWheels: false,
  });

  // Get the descriptions generated from local storage, if null set to zero
  useEffect(() => {
    // Set the descriptions generated in local storage
    setDescriptionsGenerated(
      localStorage.getItem("descriptionsGenerated") || 0
    );
  }, []);

  /**
   * Function to get the json data for the manufacturers
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("car-list.json"); // Assuming carData.json is in the public folder
        const data = await response.json();
        // Set the response data equal to the the car data hook
        setCarData(data);
        // Get the cars manufacturers in an array
        const options = data.map((car) => car.brand);
        options.sort();
        setManufacturerOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /**
   *
   * @param {*} e
   */
  const handleManufacturerChange = (e) => {
    // Need to set the form data
    // Need to update the model options
    console.log(e);
    if (e === "") {
      setModelsEnabled(false);
      setManufacturer(e);
      setModel("");
      return;
    }
    setModelsEnabled(true);
    setManufacturer(e);

    // Search through object to find matching brand to equal the models array
    for (let i = 0; i < carData.length; i++) {
      if (carData[i].brand === e) {
        setModelOptions(carData[i].models);
      }
    }
  };

  useEffect(() => {
    // Filter the feature object to only include the features that are true
    const featuresArray = Object.keys(features).filter(
      (feature) => features[feature]
    );
    // Create the prompt, joining the features array into a string
    const prompt = `I am selling a ${year} ${manufacturer} ${model}, the exterior color is ${color} and the interior color is ${interiorColor}. The mileage is ${mileage} kilometers, the condition is ${condition}, it has an ${transmission} transmission and a ${fuelType} ${engineSize} liter engine. Some of the additional features include ${featuresArray.join(
      ", "
    )}. Can you make me a description for car selling website Carzone?`;
    setPrompt(prompt);
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
    features,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Increment the number of descriptions generated
    setDescriptionsGenerated(descriptionsGenerated + 1);
    // Set the descriptions generated in local storage
    localStorage.setItem("descriptionsGenerated", descriptionsGenerated + 1);
    // If the number of descriptions generated are greater than 2, return
    if (descriptionsGenerated > 2) {
      console.warn("You have generated too many descriptions");
      return;
    }
    // Send the prompt to open ai api
    setLoading(true);
    setError("");

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [{ role: "user", content: prompt }],
      });
      console.log("completion", completion);
      setDescription(completion.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setError("Error fetching data from OpenAI.");
    }
    setLoading(false);
  };

  return (
    <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white">
      <h1 className="text-4xl text-center p-8">Car Descriptions Generator</h1>
      <div>
        <form
          className="grid gap-2 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          onSubmit={handleSubmit}
        >
          <Dropdown
            options={manufacturerOptions}
            label={"Manufacturer"}
            onSelectedChange={handleManufacturerChange}
          />
          <Dropdown
            options={modelOptions}
            label={"Model"}
            onSelectedChange={setModel}
            disabled={!modelsEnabled}
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
          <div className="col-span-full text-center">
            <button
              onClick={() => setDisplayFeatureToggles(!displayFeatureToggles)}
              className="bg-slate-400 px-6 py-3 rounded-lg hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 mr-4"
            >
              {displayFeatureToggles ? "Hide Features" : "Show Features"}
            </button>
          </div>

          {displayFeatureToggles && (
            <>
              <Toggle
                label={"Sunroof"}
                onToggle={(value) =>
                  setFeatures({ ...features, sunroof: value })
                }
              />
              <Toggle
                label={"Leather Seats"}
                onToggle={(value) =>
                  setFeatures({ ...features, leatherSeats: value })
                }
              />
              <Toggle
                label={"Bluetooth"}
                onToggle={(value) =>
                  setFeatures({ ...features, bluetooth: value })
                }
              />
              <Toggle
                label={"Heated Seats"}
                onToggle={(value) =>
                  setFeatures({ ...features, heatedSeats: value })
                }
              />
              <Toggle
                label={"Parking Sensors"}
                onToggle={(value) =>
                  setFeatures({ ...features, parkingSensors: value })
                }
              />
              <Toggle
                label={"Heated Steering Wheel"}
                onToggle={(value) =>
                  setFeatures({ ...features, heatedSteeringWheel: value })
                }
              />
              <Toggle
                label={"Carplay"}
                onToggle={(value) =>
                  setFeatures({ ...features, carplay: value })
                }
              />
              <Toggle
                label={"Android Auto"}
                onToggle={(value) =>
                  setFeatures({ ...features, androidAuto: value })
                }
              />
              <Toggle
                label={"Reverse Camera"}
                onToggle={(value) =>
                  setFeatures({ ...features, reverseCamera: value })
                }
              />
              <Toggle
                label={"Blind Spot Monitoring"}
                onToggle={(value) =>
                  setFeatures({ ...features, blindSpotMonitoring: value })
                }
              />
              <Toggle
                label={"Lane Keep Assist"}
                onToggle={(value) =>
                  setFeatures({ ...features, laneKeepAssist: value })
                }
              />
              <Toggle
                label={"Adaptive Cruise Control"}
                onToggle={(value) =>
                  setFeatures({ ...features, adaptiveCruiseControl: value })
                }
              />
              <Toggle
                label={"Keyless Entry"}
                onToggle={(value) =>
                  setFeatures({ ...features, keylessEntry: value })
                }
              />
              <Toggle
                label={"Metallic Paint"}
                onToggle={(value) =>
                  setFeatures({ ...features, metallicPaint: value })
                }
              />
              <Toggle
                label={"Electric Seats"}
                onToggle={(value) =>
                  setFeatures({ ...features, electricSeats: value })
                }
              />
              <Toggle
                label={"Memory Seats"}
                onToggle={(value) =>
                  setFeatures({ ...features, memorySeats: value })
                }
              />
              <Toggle
                label={"Lumbar Support"}
                onToggle={(value) =>
                  setFeatures({ ...features, lumbarSupport: value })
                }
              />
              <Toggle
                label={"LED Lights"}
                onToggle={(value) =>
                  setFeatures({ ...features, LEDLights: value })
                }
              />
              <Toggle
                label={"Alloy Wheels"}
                onToggle={(value) =>
                  setFeatures({ ...features, alloyWheels: value })
                }
              />
            </>
          )}

          <div className="col-span-full text-center">
            <button
              type="submit"
              className="bg-slate-400 px-6 py-3 rounded-lg hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 mr-4"
            >
              Generate Description
            </button>
          </div>
        </form>
      </div>
      {description && <Output text={description} />}
    </div>
  );
};
export default HomePage;
