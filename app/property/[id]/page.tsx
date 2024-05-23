import React, { FC, Suspense } from "react";
import ItemSection from "@/containers/property-page/item-section";

interface PropertiesProps {
  params: { id: string };
}

const Property: FC<PropertiesProps> = ({ params }) => {
  return (
    <main>
      <Suspense>
        <ItemSection propertyId={params.id} />
      </Suspense>
    </main>
  );
};

export default Property;
