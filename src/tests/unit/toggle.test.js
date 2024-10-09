// Toggle.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '../../Components/Toggle/Toggle';

// Test for rendering the component
test('renders the toggle component with the correct label', () => {
  const label = 'Test Toggle';
  render(<Toggle label={label} onToggle={() => {}} />);

  const labelElement = screen.getByText(label);
  expect(labelElement).toBeInTheDocument();
});

// Test for clicking the toggle switch
test('calls onToggle and changes state when clicked', () => {
  const onToggleMock = jest.fn();
  render(<Toggle label="Click Toggle" onToggle={onToggleMock} />);

  const toggleElement = screen.getByRole('button');
  
  // Click the toggle
  fireEvent.click(toggleElement)

  // onToggle should be called with true
  expect(onToggleMock).toHaveBeenCalledWith(true);

  // Click the toggle again
  fireEvent.click(toggleElement);

  // onToggle should be called with false
  expect(onToggleMock).toHaveBeenCalledWith(false);
});

// Test for keyboard events (Space/Enter)
test('calls onToggle when space or enter is pressed', () => {
  const onToggleMock = jest.fn();
  render(<Toggle label="Keyboard Toggle" onToggle={onToggleMock} />);

  const toggleElement = screen.getByRole('button');

  // Press "Enter" key
  fireEvent.keyDown(toggleElement, { key: 'Enter', code: 'Enter' });
  expect(onToggleMock).toHaveBeenCalledWith(true);

  // Press "Space" key
  fireEvent.keyDown(toggleElement, { key: ' ', code: 'Space' });
  expect(onToggleMock).toHaveBeenCalledWith(false);
});

// Test for the visual state of the toggle
test('displays correct color based on toggle state', () => {
  const { rerender } = render(<Toggle label="Color Test" onToggle={() => {}} />);
  
  const toggleElement = screen.getByRole('button');

  // Initial state should have grey background (untoggled)
  expect(toggleElement).toHaveStyle('background-color: grey');

  // Rerender with toggled state
  fireEvent.click(toggleElement);
  rerender(<Toggle label="Color Test" onToggle={() => {}} />);
  expect(toggleElement).toHaveStyle('background-color: green');
});
