import prisma from "@/lib/prisma";
import { Listing } from "@/types/types";

export default async function ListingPage({ params }) {
  const { id } = params;
  const listing = await prisma.property.findUnique({
    where: { id },
  });

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div>
      <div className="sm:flex gap-12">
        <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="rounded-md max-w-90 max-w-96" />
        <div className="pt-8 sm:pt-2">
          <h3 className="text-3xl font-semibold mb-4">{listing.title}</h3>
          <p>{listing.description}</p>
        </div>
      </div>
      <div className="my-8">
        <span className="text-lg font-medium mb-4">Property Details</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
          <div>
            <p className="text-md font-medium">Type</p>
            <span className="text-sm">For {listing.type}</span>
          </div>
          <div>
            <p className="text-md font-medium">Price</p>
            <span className="text-sm">${listing.price}</span>
          </div>
          <div>
            <p className="text-md font-medium">Bedrooms</p>
            <span className="text-sm">{listing.bedrooms}</span>
          </div>
          <div>
            <p className="text-md font-medium">Area</p>
            <span className="text-sm">{listing.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
}