"use client";
import React, { FC, useRef, useState, CSSProperties } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Zoom, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

interface PropertySliderProps {
  gallery: Array<{ id: string; url: string }>;
}

interface SwiperStyle extends CSSProperties {
  "--swiper-navigation-color"?: string;
  "--swiper-pagination-color"?: string;
}

const PropertyImageSlider: FC<PropertySliderProps> = ({ gallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        zoom={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Zoom, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as SwiperStyle
        }
      >
        {gallery.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full swiper-zoom-container">
              <Image
                src={item.url}
                width={394}
                height={360}
                className="w-full h-full object-cover"
                alt="Product IMG"
                title="Double Tap to Zoom In/Out"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {gallery.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full">
              <Image
                src={item.url}
                width={394}
                height={360}
                className="w-full h-full object-cover"
                alt="Product IMG"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PropertyImageSlider;
