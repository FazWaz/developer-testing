import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  area: number;
  images: { id: string; url: string }[];
  createdAt: string;
  updatedAt: string;
};

type PropertyCardProps = {
  listing: Listing;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/listing/${listing.id}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="relative flex flex-col rounded-lg p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:cursor-pointer hover:underline"
      >
        <img className="rounded-md" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <div className="absolute top-0 right-0 inline-flex mt-4 mr-4 w-9">
        </div>
        <div className="py-3">
          <h3 className="text-lg font-semibold w-full line-clamp-2">{listing.title}</h3>
          <span className="text-base font-normal inline-block">{listing.description}</span>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;