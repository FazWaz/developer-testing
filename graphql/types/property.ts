import { extendType, intArg, objectType, stringArg, enumType } from "nexus";
import { Gallery } from "./gallery";
import { PropertyTypes } from "@/constants/PropertyTypes";
import { Types } from "@/constants/Types";
import { PrismaClient } from "@prisma/client/extension";

const PropertyTypeEnum = enumType({
    name: "propertyType",
    members: PropertyTypes,
});

const TypeEnum = enumType({
    name: "type",
    members: Types,
});

export const Property = objectType({
    name: "Property",
    definition(t) {
        t.string("id");
        t.string("name");
        t.string("title");
        t.string("description");
        t.string("bedroom");
        t.string("area");
        t.float("price");
        t.string("thumbnail");
        t.field("type", { type: TypeEnum });
        t.field("propertyType", { type: PropertyTypeEnum });
        t.list.field('gallery', {
            type: Gallery,
            resolve: (parent, _args, ctx) => {
                return ctx.prisma.property
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .gallery();
            },
        });
    }
});

export const Edge = objectType({
    name: "Edge",
    definition(t) {
        t.string('cursor');
        t.field('node', {
            type: Property,
        });
    },
});

export const PageInfo = objectType({
    name: "PageInfo",
    definition(t) {
        t.string('startCursor');
        t.string('endCursor');
        t.boolean('hasNextPage');
        t.boolean('hasPreviousPage');
    },
});

export const Response = objectType({
    name: "Response",
    definition(t) {
        t.field('pageInfo', { type: PageInfo });
        t.list.field('edges', { type: Edge });
        t.int('totalCount');
    },
});

export interface Context {
    prisma: PrismaClient;
}

export const PropertyQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("properties", {
            type: "Response",
            args: {
                first: intArg(),
                after: stringArg(),
                search: stringArg(),
                type: stringArg(),
                sort: stringArg(),
                price_range: stringArg(),
                area_range: stringArg(),
                property_type: stringArg(),
            },
            async resolve(_, args, ctx: Context) {
                const { first, after, search, type, sort, price_range, area_range, property_type } = args;

                // Build filters
                const searchFilter = search ? {
                    OR: [
                        { name: { contains: search } },
                        { title: { contains: search } },
                    ],
                } : {};

                const typeFilter = type ? {
                    type: { equals: type.toUpperCase() },
                } : {};

                const propertyTypeFilter = property_type ? {
                    propertyType: { equals: property_type.toUpperCase() },
                } : {};

                const [minPrice, maxPrice] = price_range ? price_range.split("-").map(parseFloat) : [];
                const priceFilter = (minPrice && maxPrice) ? {
                    price: {
                        gte: minPrice,
                        lte: maxPrice,
                    },
                } : {};

                const [minArea, maxArea] = area_range ? area_range.split("-").map(parseFloat) : [];
                const areaFilter = (minArea && maxArea) ? {
                    area: {
                        gte: minArea,
                        lte: maxArea,
                    },
                } : {};

                const combinedFilter = {
                    ...searchFilter,
                    ...typeFilter,
                    ...propertyTypeFilter,
                    ...priceFilter,
                    ...areaFilter,
                };

                // Determine the sorting order
                const orderBy = sort === "pricelow" ? { price: 'asc' } :
                                sort === "pricehigh" ? { price: 'desc' } :
                                undefined;

                // Execute a single query to get both the results and the total count
                const [properties, totalCount] = await Promise.all([
                    ctx.prisma.property.findMany({
                        take: first!,
                        skip: after ? 1 : 0,
                        cursor: after ? { id: after } : undefined,
                        where: combinedFilter,
                        orderBy,
                    }),
                    ctx.prisma.property.count({
                        where: combinedFilter,
                    }),
                ]);

                if (properties.length > 0) {
                    const lastProperty = properties[properties.length - 1];
                    const myCursor = lastProperty.id;

                    const hasNextPage = (await ctx.prisma.property.findMany({
                        take: first!,
                        skip: 1,
                        cursor: { id: myCursor },
                        where: combinedFilter,
                        orderBy,
                    })).length > 0;

                    const result = {
                        pageInfo: {
                            startCursor: properties[0].id,
                            endCursor: myCursor,
                            hasNextPage,
                            hasPreviousPage: !!after,
                        },
                        edges: properties.map((property: { id: any; }) => ({
                            cursor: property.id,
                            node: property,
                        })),
                        totalCount,
                    };

                    return result;
                }

                return {
                    pageInfo: {
                        startCursor: null,
                        endCursor: null,
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    edges: [],
                    totalCount,
                };
            },
        });

        t.field("property", {
            type: "Property",
            args: {
                id: stringArg(),
            },
            resolve(parent, args, ctx: Context) {
                return ctx.prisma.property.findUnique({
                    where: { id: args.id! },
                });
            },
        });
    }
});
