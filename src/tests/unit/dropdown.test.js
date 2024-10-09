// Dropdown.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../../Components/Dropdown/DropDown";

// Test 1: Check if the dropdown renders with correct label and options
test("renders dropdown with correct label and default option", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const label = "Test Label";
  render(
    <Dropdown options={options} selected="" onSelectedChange={() => {}} label={label} />
  );

  // Check if label is rendered
  const labelElement = screen.getByText(label);
  expect(labelElement).toBeInTheDocument();

  // Check if default option is present
  const defaultOption = screen.getByText(`Select a ${label}`);
  expect(defaultOption).toBeInTheDocument();

  // Check if all options are rendered
  options.forEach((option) => {
    const optionElement = screen.getByText(option);
    expect(optionElement).toBeInTheDocument();
  });
});

// Test 2: Simulate selecting an option and verify onSelectedChange is called
test("calls onSelectedChange when an option is selected", () => {
  const onSelectedChangeMock = jest.fn();
  const options = ["Option 1", "Option 2"];
  
  render(
    <Dropdown
      options={options}
      selected=""
      onSelectedChange={onSelectedChangeMock}
      label="Test Label"
    />
  );

  const selectElement = screen.getByRole("combobox"); // Select dropdown by role

  // Simulate selecting an option
  fireEvent.change(selectElement, { target: { value: "Option 1" } });

  // Check if onSelectedChange was called with the selected value
  expect(onSelectedChangeMock).toHaveBeenCalledWith("Option 1");
});

// Test 3: Check if dropdown is disabled when the disabled prop is true
test("renders disabled dropdown when disabled prop is true", () => {
  const options = ["Option 1", "Option 2"];
  render(
    <Dropdown
      options={options}
      selected=""
      onSelectedChange={() => {}}
      label="Test Label"
      disabled={true}
    />
  );

  const selectElement = screen.getByRole("combobox"); // Select dropdown by role

  // Check if the select element is disabled
  expect(selectElement).toBeDisabled();
});
