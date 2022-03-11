import { render, screen } from "@testing-library/react";
import AddMovie from "../components/AddMovie";
import "@testing-library/jest-dom/extend-expect";

test("Check suggestions right after loading component", () => {
  render(<AddMovie />);
  const suggestions = screen.getByText("No suggestions");
  expect(suggestions).toBeInTheDocument();
});

test("Check if submit button is disabled", () => {
  render(<AddMovie />);
  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeDisabled();
});
