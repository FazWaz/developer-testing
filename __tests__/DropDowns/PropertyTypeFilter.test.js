import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PropertyTypeDropdown from "../../components/DropDowns/PropertyTypeFilter";
import "@testing-library/jest-dom";
import { PropertyTypes } from "../../constants/PropertyTypes";

describe("PropertyTypeDropdown component", () => {
  test("renders with default label", () => {
    const { getByText } = render(<PropertyTypeDropdown label="All" />);
    expect(getByText("All")).toBeInTheDocument();
  });

  test("renders with provided label", () => {
    const { getByText } = render(<PropertyTypeDropdown label="Custom Label" />);
    expect(getByText("Custom Label")).toBeInTheDocument();
  });

  test("opens dropdown on click", () => {
    const { getByText } = render(<PropertyTypeDropdown label="All" />);
    const dropdown = getByText("All");

    fireEvent.click(dropdown);

    PropertyTypes.map((propertyType) => {
      expect(
        getByText(
          propertyType[0].toUpperCase() +
            "" +
            propertyType.toLowerCase().substring(1)
        )
      ).toBeInTheDocument();
    });
  });
});
