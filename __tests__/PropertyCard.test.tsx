import { render, screen } from "@testing-library/react";
import PropertyCard from "../components/Cards/PropertyCard";
import { TProperty } from "@/types/TProperty";
import "@testing-library/jest-dom";

const mockProperty: TProperty = {
  id: "1",
  name: "Property Name",
  thumbnail: "/path/to/image.jpg",
  propertyType: "APARTMENT",
  type: "SALE",
  price: 350000,
  title: "Beautiful Family Apartment",
  bedroom: 3,
  area: 1200,
  description: "Description of the property",
  gallery: [
    {
      id: "1",
      url: "/path/to/image.jpg",
    },
    {
      id: "2",
      url: "/path/to/image.jpg",
    },
  ],
};

describe("PropertyCard", () => {
  it("renders property details correctly", () => {
    render(<PropertyCard item={mockProperty} />);

    const image = screen.getByAltText("Property IMG");
    expect(image).toBeInTheDocument();

    expect(
      screen.getByText(mockProperty.propertyType + " • " + mockProperty.type)
    ).toBeInTheDocument();

    expect(
      screen.getByText("$" + mockProperty.price.toLocaleString("en-us"))
    ).toBeInTheDocument();

    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();

    expect(screen.getByText(mockProperty.bedroom)).toBeInTheDocument();

    expect(screen.getByText(mockProperty.area)).toBeInTheDocument();
  });
});
