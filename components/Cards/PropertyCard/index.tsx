import { TProperty } from "@/types/TProperty";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface PropertyCardProps {
  item: TProperty;
}

const PropertyCard: FC<PropertyCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col md:gap-8 gap-5">
      <div className="max-w-sm w-full sm:w-full lg:w-full">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Link href={"/property/" + item.id}>
            <Image
              src={item.thumbnail}
              width={394}
              height={360}
              className="w-full h-full object-cover"
              alt="Property IMG"
            />
          </Link>
          <Link href={"/property/" + item.id}>
            <div className="p-4">
              <p className="uppercase tracking-wide text-sm font-bold text-gray-700 line-clamp-1">
                {item.propertyType} • {item.type}
              </p>
              <p className="text-3xl text-gray-900">
                {"$" + item.price.toLocaleString("en-us")}
              </p>
              <p className="text-gray-700 line-clamp-1">{item.title}</p>
            </div>
            <div className="flex p-4 border-t border-gray-300 text-gray-700">
              <div className="flex-1 inline-flex items-center">
                <svg
                  className="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
                </svg>
                <p>
                  <span className="text-gray-900 font-bold">
                    {item.bedroom}
                  </span>{" "}
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
