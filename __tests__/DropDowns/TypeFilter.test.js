import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TypeDropdown from "../../components/DropDowns/TypeFilter";
import "@testing-library/jest-dom";

describe("TypeDropdown component", () => {
  test("renders with default label", () => {
    const { getByText } = render(<TypeDropdown label="All" />);
    expect(getByText("All")).toBeInTheDocument();
  });

  test("renders with provided label", () => {
    const { getByText } = render(<TypeDropdown label="Custom Label" />);
    expect(getByText("Custom Label")).toBeInTheDocument();
  });

  test("opens dropdown on click", () => {
    const { getByText } = render(<TypeDropdown label="All" />);
    const dropdown = getByText("All");

    fireEvent.click(dropdown);

    expect(getByText("Sale")).toBeInTheDocument();
    expect(getByText("Rent")).toBeInTheDocument();
  });
});
