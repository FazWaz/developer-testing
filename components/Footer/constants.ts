import { FooterNav } from "@/types/FooterNav";

export const FooterNavs: FooterNav[] = [
  {
    id: 1,
    category: "Properties For Sale",
    navs: [
      {
        id: 1,
        value: "Condos for sale",
        href: "#",
      },
      {
        id: 2,
        value: "Apartments for sale",
        href: "/",
      },
      {
        id: 3,
        value: "Houses for sale",
        href: "/",
      },
      {
        id: 4,
        value: "Townhouses for sale",
        href: "/",
      },
    ],
  },
  {
    id: 2,
    category: "Properties For Rent",
    navs: [
      {
        id: 1,
        value: "Condos for rent",
        href: "/",
      },
      {
        id: 2,
        value: "Apartments for rent",
        href: "/",
      },
      {
        id: 3,
        value: "Houses for rent",
        href: "/",
      },
      {
        id: 4,
        value: "Townhouses for rent",
        href: "/",
      },
    ],
  },
  {
    id: 3,
    category: "Popular Areas",
    navs: [
      {
        id: 1,
        value: "Properties For Sale in Thailand",
        href: "/",
      },
      {
        id: 2,
        value: "Properties For Sale in Bangkok",
        href: "/",
      },
      {
        id: 3,
        value: "Properties For Sale in Sukhumvit",
        href: "/",
      },
    ],
  },
];
