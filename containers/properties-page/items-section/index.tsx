"use client";

import React, { FC, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import PropertyCard from "@/components/Cards/PropertyCard";
import SortDropDown from "@/components/DropDowns/Sort";
import { TProperty } from "@/types/TProperty";

interface PropertiesItemsProps {
  type: "RENT" | "SALE";
  sort: string | undefined;
}

interface Edge {
  node: TProperty;
  cursor: string;
}

interface PropertiesData {
  properties: {
    __typename: string;
    edges: Edge[];
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

const GET_PROPERTIES = gql`
  query Query($first: Int, $after: String, $type: String, $sort: String) {
    properties(first: $first, after: $after, type: $type, sort: $sort) {
      edges {
        cursor
        node {
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
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const PropertiesItems: FC<PropertiesItemsProps> = ({ type, sort }) => {
  const { loading, error, data, fetchMore, networkStatus } =
    useQuery<PropertiesData>(GET_PROPERTIES, {
      variables: {
        first: 12,
        after: null,
        type,
        sort,
      },
      notifyOnNetworkStatusChange: true,
    });

  if (loading && networkStatus !== 3)
    return (
      <p className="text-slate-500 text-xl text-center py-10">Please Wait...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center py-10">Error: {error.message}</p>
    );

  const properties = data?.properties.edges || [];
  const pageInfo = data?.properties.pageInfo;

  const loadMoreProperties = () => {
    if (pageInfo?.endCursor) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return {
            properties: {
              __typename: previousResult.properties.__typename,
              edges: [
                ...previousResult.properties.edges,
                ...fetchMoreResult.properties.edges,
              ],
              pageInfo: fetchMoreResult.properties.pageInfo,
            },
          };
        },
      });
    }
  };

  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col justify-between gap-2 md:gap-5 w-full max-w-screen-xl mx-5 md:mx-20 md:px-0">
        <div className="w-full flex justify-start lg:justify-between">
          <div className="flex md:gap-6">
            <h2 className="text-2xl md:text-4xl text-black font-bold">
              Properties
            </h2>
          </div>
          <div className="hidden lg:flex gap-6">
            <SortDropDown />
          </div>
        </div>
        <div
          id="items"
          className="w-full grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] grid flex-wrap gap-[60px]"
        >
          {properties.map(({ node }: Edge, index: number) => (
            <PropertyCard key={index} item={node} />
          ))}
        </div>
        <div className="w-full flex justify-center mb-10">
          {pageInfo?.hasNextPage ? (
            <button
              className="bg-primaryColor flex justify-center items-center w-[130px] mt-5 p-1 md:p-3 md:w-[160px] md:h-[42px] text-sm md:text-md text-white"
              onClick={loadMoreProperties}
              disabled={networkStatus === 3}
            >
              {networkStatus === 3 ? "Loading..." : "Load More"}
            </button>
          ) : (
            <p className="text-slate-500 mt-6">No more properties.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesItems;
