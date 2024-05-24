import { render, screen } from "@testing-library/react";
import Brand from "@/components/Brand";
import "@testing-library/jest-dom";

// Mock the Logo component
jest.mock("../Components/Icons/Logo", () => ({
  Logo: () => <div data-testid="logo" />,
}));

describe("Brand", () => {
  it("renders the logo and the brand name", () => {
    render(<Brand />);

    // Check if the Logo component is rendered
    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();
    const brandName = screen.getByText("Real Estate");
    expect(brandName).toBeInTheDocument();
    expect(brandName).toHaveClass("text-black text-2xl font-bold");
  });
});
