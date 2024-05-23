export type TProperty = {
    id:string,
    name:string,
    title:string,
    description:string,
    area:number,
    bedroom:number,
    price:number,
    thumbnail: string,
    type:string,
    propertyType:string,
    gallery: Array<{id:string, url:string}>
}