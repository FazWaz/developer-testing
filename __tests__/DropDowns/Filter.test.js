import { render, screen } from "@testing-library/react";
import FilterDropdown from "../../components/DropDowns/Filter"; // Adjust the import path as per your project structure
import React from "react";
import "@testing-library/jest-dom"; // Import the extend-expect module

// Mock the Filter icon component
jest.mock("../../components/Icons/Filter", () => ({
  Filter: () => <div data-testid="filter-icon" />,
}));

describe("FilterDropdown", () => {
  it("renders the FilterDropdown component with the Filter icon and text", () => {
    render(<FilterDropdown />);
    const filterIcon = screen.getByTestId("filter-icon");
    expect(filterIcon).toBeInTheDocument();

    // Check if the "Filter" text is rendered
    const filterText = screen.getByText("Filter");
    expect(filterText).toBeInTheDocument();
  });
});
