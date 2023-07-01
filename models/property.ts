export type PropertyType = {
  id: number
  name: string
  title: string
  description?: string
  listingType: 'rent' | 'buy'
  price: number
  priceFormatted: string
  priceCurrency: string
  bedroomCount: number
  area: number
  photosUrls: string[]
}

export default class Property {
  readonly id: number
  readonly name: string
  readonly title: string
  readonly description?: string
  readonly listingType: string
  readonly price: number
  readonly priceFormatted: string
  readonly priceCurrency: string
  readonly bedroomCount: number
  readonly area: number
  readonly photosUrls: string[]

  constructor({
    id,
    name,
    title,
    description,
    listingType,
    price,
    priceFormatted,
    priceCurrency,
    bedroomCount,
    area,
    photosUrls,
  }: PropertyType) {
    this.id = id
    this.name = name
    this.title = title
    this.description = description
    this.listingType = listingType
    this.price = price
    this.priceFormatted = priceFormatted
    this.priceCurrency = priceCurrency
    this.bedroomCount = bedroomCount
    this.area = area
    this.photosUrls = photosUrls
  }

  static fromArray(arr: PropertyType[]) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expected an array.')
    }

    return arr.map((obj) => new Property(obj))
  }

  get thumbnail(): string {
    return this.photosUrls[0]
  }

  get areaSqm(): string {
    return this.area + ' sqm'
  }

  get featuresList(): string[] {
    return [`Area is ${this.areaSqm}`, `Bedroom count is ${this.bedroomCount}`]
  }
}
