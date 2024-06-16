import PropertyListings from "./components/PropertyListings";

export default function Home() {
  return (
    <main>
      <div>
        <h1 className="text-2xl font-semibold py-8">
          All Listings
        </h1>
        <PropertyListings />
      </div>
    </main>
  );
}
