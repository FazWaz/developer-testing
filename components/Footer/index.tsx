import React, { FC } from "react";
import Brand from "../Brand";
import { FooterNavs } from "./constants";
import Link from "next/link";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const brandName = process.env.APP_NAME;
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="w-full py-5 border-t border-[#ECE4DE]">
        <p className="text-black text-center text-sm">
          © {currentYear} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
