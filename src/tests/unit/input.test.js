// Input.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../Components/Input/Input";

// Test 1: Check if the input renders correctly with a label
test("renders input component with correct label", () => {
  const label = "Test Label";
  render(<Input label={label} value="" onChange={() => {}} />);

  const labelElement = screen.getByText(label);
  expect(labelElement).toBeInTheDocument();
  
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

// Test 2: Simulate typing in the input and verify onChange is called
test("calls onChange when user types in the input", () => {
  const onChangeMock = jest.fn();
  render(<Input label="Username" value="" onChange={onChangeMock} />);

  const inputElement = screen.getByRole("textbox");

  // Simulate typing in the input
  fireEvent.change(inputElement, { target: { value: "new input" } });

  // Check if onChange is called with the new input value
  expect(onChangeMock).toHaveBeenCalledWith("new input");
});

// Test 3: Verify input respects the type, min, and max props
test("renders input with type, min, and max attributes", () => {
  const { rerender } = render(
    <Input label="Number Input" value="" onChange={() => {}} type="number" min={0} max={100} />
  );

  const inputElement = screen.getByRole("spinbutton"); // 'spinbutton' is used for number inputs

  // Check if input has the correct type
  expect(inputElement).toHaveAttribute("type", "number");

  // Check if input has the correct min and max values
  expect(inputElement).toHaveAttribute("min", "0");
  expect(inputElement).toHaveAttribute("max", "100");

  // Rerender with a different type
  rerender(<Input label="Email Input" value="" onChange={() => {}} type="email" />);
  
  const emailInputElement = screen.getByRole("textbox"); // 'textbox' for email input
  expect(emailInputElement).toHaveAttribute("type", "email");
});
