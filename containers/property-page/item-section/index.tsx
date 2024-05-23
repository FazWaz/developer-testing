import Image from "next/image";
import React, { FC } from "react";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import PropertyImageSlider from "../property-image-slider";

interface ItemSectionProps {
  propertyId: string;
}

const GET_PROPERTY = gql`
  query Property($propertyId: String) {
    property(id: $propertyId) {
      id
      name
      title
      description
      bedroom
      area
      price
      thumbnail
      type
      propertyType
      gallery {
        id
        url
      }
    }
  }
`;

const ItemSection: FC<ItemSectionProps> = async ({ propertyId }) => {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PROPERTY,
    variables: {
      propertyId,
    },
  });

  const item = data?.property;
  return (
    <section className="w-full flex justify-center bg-slate-100 p-3">
      <div className="flex flex-col lg:flex-row items-center justify-between  gap-2 md:gap-5 w-full max-w-screen-xl mx-5 md:mx-20 md:py-20">
        <div className="h-auto w-full lg:w-[600px] xs:p-5 bg-white p-3 shadow-sm rounded-md">
          <PropertyImageSlider gallery={item.gallery}></PropertyImageSlider>
        </div>
        <div className="flex flex-col justify-center gap-[30px] w-full md:w-[590px]">
          <div className="flex flex-col gap-2">
            <h1 className="xl:text-4xl text-2xl text-black font-bold">
              {item.propertyType} • {item.type}
            </h1>
            <span className="text-textColor text-sm md:text-lg">
              {item.name}
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-black text-sm md:text-lg font-semibold">
              {item.title}
            </h3>
            <p className="text-textColor text-sm xl:text-lg ">
              {item.description}
            </p>
          </div>
          <div className="">
            <span className="xl:text-4xl text-2xl text-black font-bold">
              $ {item.price.toLocaleString("en-us")}
            </span>
          </div>
          <div className="flex p-4 text-gray-700 bg-white rounded-md">
            <div className="flex-1 inline-flex items-center">
              <svg
                className="h-6 w-6 text-gray-600 fill-current mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
              </svg>
              <p>
                <span className="text-gray-900 font-bold">{item.bedroom}</span>{" "}
                Bedrooms
              </p>
            </div>
            <div className="flex-1 inline-flex justify-end items-center">
              <svg
                className="h-6 w-6 text-gray-600 fill-current mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M27 22.142V9.858A3.992 3.992 0 1 0 22.142 5H9.858A3.992 3.992 0 1 0 5 9.858v12.284A3.992 3.992 0 1 0 9.858 27h12.284A3.992 3.992 0 1 0 27 22.142M26 4a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m16.142-3H9.858A4 4 0 0 0 7 22.142V9.858A4 4 0 0 0 9.858 7h12.284A4 4 0 0 0 25 9.858v12.284A3.99 3.99 0 0 0 22.142 25M26 28a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2"
                />
              </svg>
              <p>
                <span className="text-gray-900 font-bold">{item.area}</span>{" "}
                sqft
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemSection;
