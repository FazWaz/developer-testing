import { render, screen, fireEvent } from "@testing-library/react";
import AreaRangeDropdown from "@/components/DropDowns/AreaRange";
import "@testing-library/jest-dom";

describe("AreaRangeDropdown", () => {
  it("renders the dropdown component", () => {
    render(<AreaRangeDropdown label="Area" />);

    const label = screen.getByText("Area");
    expect(label).toBeInTheDocument();
  });

  it("toggles dropdown on click", () => {
    render(<AreaRangeDropdown label="Area" />);

    const dropdownTrigger = screen.getByText("Area");
    fireEvent.click(dropdownTrigger);

    const minAreaInput = screen.getByPlaceholderText("Min Area (sqft)");
    expect(minAreaInput).toBeInTheDocument();
  });

  it("handles setting min and max area values", () => {
    render(<AreaRangeDropdown label="Area" />);

    const dropdownTrigger = screen.getByText("Area");
    fireEvent.click(dropdownTrigger);

    const minAreaInput = screen.getByPlaceholderText("Min Area (sqft)");
    const maxAreaInput = screen.getByPlaceholderText("Max Area (sqft)");

    fireEvent.change(minAreaInput, { target: { value: "500" } });
    fireEvent.change(maxAreaInput, { target: { value: "1000" } });

    expect(minAreaInput.value).toBe("500");
    expect(maxAreaInput.value).toBe("1000");
  });

  it("enables and disables the set button based on input values", () => {
    render(<AreaRangeDropdown label="Area" />);

    const dropdownTrigger = screen.getByText("Area");
    fireEvent.click(dropdownTrigger);

    const minAreaInput = screen.getByPlaceholderText("Min Area (sqft)");
    const maxAreaInput = screen.getByPlaceholderText("Max Area (sqft)");
    const setButton = screen.getByText("Set");

    fireEvent.change(minAreaInput, { target: { value: "500" } });
    fireEvent.change(maxAreaInput, { target: { value: "1000" } });

    expect(setButton).not.toHaveClass("bg-slate-300");
    expect(setButton).toHaveClass("bg-primaryColor");

    fireEvent.change(maxAreaInput, { target: { value: "400" } });

    expect(setButton).toHaveClass("bg-slate-300");
  });

  it("sets area range and clears it", () => {
    render(<AreaRangeDropdown label="Area" />);

    const dropdownTrigger = screen.getByText("Area");
    fireEvent.click(dropdownTrigger);

    const minAreaInput = screen.getByPlaceholderText("Min Area (sqft)");
    const maxAreaInput = screen.getByPlaceholderText("Max Area (sqft)");
    const setButton = screen.getByText("Set");

    fireEvent.change(minAreaInput, { target: { value: "500" } });
    fireEvent.change(maxAreaInput, { target: { value: "1000" } });
    fireEvent.click(setButton);

    expect(screen.getByText("500-1000")).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(screen.getByText("Area")).toBeInTheDocument();
    expect(minAreaInput.value).toBe("");
    expect(maxAreaInput.value).toBe("");
  });
});
