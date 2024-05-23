"use client";
import React, { FC } from "react";
import Brand from "../Brand";
import HamburgerButton from "../Buttons/HamburgerButton";
import { useLayoutStore } from "@/store/useLayoutStore";
import { HeaderNavs } from "../Header/constants";
import Link from "next/link";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const { mobileOpen, handleMobileOpen } = useLayoutStore();
  return (
    <div
      className={`w-screen h-full bg-white z-20 py-4 px-5 fixed top-0 lg:hidden flex flex-col ${
        mobileOpen ? "" : "!hidden"
      }`}
    >
      <div className="h-full">
        <div className="flex justify-between items-center">
          <Brand />
          <HamburgerButton />
        </div>
        <div className="flex flex-col h-full py-32 px-2">
          <ul className="flex h-full justify-between items-center flex-col">
            {HeaderNavs.map((el, _i) => (
              <li key={_i}>
                <Link
                  onClick={() => handleMobileOpen(false)}
                  href={el.href}
                  className="text-black text-lg font-bold"
                >
                  {el.value}
                </Link>
              </li>
            ))}
            <li>
              <Link
                onClick={() => handleMobileOpen(false)}
                href={"/auth/login"}
                className="text-black text-lg font-bold"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
