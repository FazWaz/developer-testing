"use server";


import { redirect, useSearchParams } from "next/navigation";


const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";

  // Make sure to include https:// when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const searchHandler = async (formData: FormData) => {
  const key = formData.get("search"),
    sort = formData.get("sort"),
    price = formData.get("price_range"),
    area = formData.get("area_range"),
    type = formData.get("type"),
    property_type = formData.get("property_type");

  let url = "";
  if (key) {
    url += "?search=" + key;
  }
  if (sort) {
    url += (url ? "&" : "?") + "sort=" + sort;
  }
  if (price) {
    url += (url ? "&" : "?") + "price_range=" + price;
  }
  if (area) {
    url += (url ? "&" : "?") + "area_range=" + area;
  }
  if (type) {
    url += (url ? "&" : "?") + "type=" + type;
  }
  if (property_type) {
    url += (url ? "&" : "?") + "property_type=" + property_type;
  }

  return redirect(getURL() + "search" + url);
};
