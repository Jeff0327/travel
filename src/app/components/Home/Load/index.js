"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RoomInfo from "./RoomInfo";
import "@/styles/custom-swiper.css";
import Map from "./Map";
function Load() {
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    "/image/backImg_1.jpg",
    "/image/backImg_2.jpg",
    "/image/backImg_3.jpg",
  ];

  const handleResize = useCallback(() => {
    const isMobileSize =
      typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile !== isMobileSize) {
      setIsMobile(isMobileSize);
    }
  }, [isMobile]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, handleResize]);

  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1920}
              height={1080}
              className="h-[500px] w-screen sm:h-screen sm:w-screen"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <RoomInfo />
      {/* <Map /> */}
    </div>
  );
}

export default Load;
