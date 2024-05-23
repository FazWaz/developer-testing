import React, { FC } from "react";

interface ProductsHeroProps {
  title: string;
  description: string;
}

const ProductsHero: FC<ProductsHeroProps> = ({ title, description }) => {
  return (
    <section className="w-full flex flex-col items-center  ">
      <div className="flex flex-col  justify-between py-10 md:pt-28 md:pb-20 items-center gap-2 md:gap-5 w-full max-w-screen-xl mx-5 md:mx-20 text-center px-5 md:px-0">
        <h1 className="text-black text-2xl md:text-6xl font-bold">{title}</h1>
        <p className="text-textColor text-sm md:text-lg w-full md:w-[600px]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default ProductsHero;
