import { render, screen, fireEvent } from "@testing-library/react";
import PriceRangeDropdown from "@/components/DropDowns/PriceRange";
import "@testing-library/jest-dom";

describe("PriceRangeDropdown", () => {
  it("renders the dropdown component", () => {
    render(<PriceRangeDropdown label="Price" />);

    const label = screen.getByText("Price");
    expect(label).toBeInTheDocument();
  });

  it("toggles dropdown on click", () => {
    render(<PriceRangeDropdown label="Price" />);

    const dropdownTrigger = screen.getByText("Price");
    fireEvent.click(dropdownTrigger);

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    expect(minPriceInput).toBeInTheDocument();
  });

  it("handles setting min and max price values", () => {
    render(<PriceRangeDropdown label="Price" />);

    const dropdownTrigger = screen.getByText("Price");
    fireEvent.click(dropdownTrigger);

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    const maxPriceInput = screen.getByPlaceholderText("Max Price");

    fireEvent.change(minPriceInput, { target: { value: "500" } });
    fireEvent.change(maxPriceInput, { target: { value: "1000" } });

    expect(minPriceInput.value).toBe("500");
    expect(maxPriceInput.value).toBe("1000");
  });

  it("enables and disables the set button based on input values", () => {
    render(<PriceRangeDropdown label="Price" />);

    const dropdownTrigger = screen.getByText("Price");
    fireEvent.click(dropdownTrigger);

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    const maxPriceInput = screen.getByPlaceholderText("Max Price");
    const setButton = screen.getByText("Set");

    fireEvent.change(minPriceInput, { target: { value: "500" } });
    fireEvent.change(maxPriceInput, { target: { value: "1000" } });

    expect(setButton).not.toHaveClass("bg-slate-300");
    expect(setButton).toHaveClass("bg-primaryColor");

    fireEvent.change(maxPriceInput, { target: { value: "400" } });

    expect(setButton).toHaveClass("bg-slate-300");
  });

  it("sets price range and clears it", () => {
    render(<PriceRangeDropdown label="Price" />);

    const dropdownTrigger = screen.getByText("Price");
    fireEvent.click(dropdownTrigger);

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    const maxPriceInput = screen.getByPlaceholderText("Max Price");
    const setButton = screen.getByText("Set");

    fireEvent.change(minPriceInput, { target: { value: "500" } });
    fireEvent.change(maxPriceInput, { target: { value: "1000" } });
    fireEvent.click(setButton);

    expect(screen.getByText("500-1000")).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(minPriceInput.value).toBe("");
    expect(maxPriceInput.value).toBe("");
  });
});
