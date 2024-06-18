export interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'SALE' | 'RENT'; // Assuming type can only be SALE or RENT
  price: number;
  bedrooms: number;
  area: number;
  images: { id: string; url: string }[];
  createdAt: string;
  updatedAt: string;
}
