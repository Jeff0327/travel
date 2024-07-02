"use client";
import Image from "next/image";
import React, { useState } from "react";

function RoomInfo() {
  const roomImages = [
    { src: "/image/room1.jpg", alt: "일반 101" },
    { src: "/image/room2.jpg", alt: "일반 102" },
    { src: "/image/room3.jpg", alt: "디럭스 101" },
    { src: "/image/room4.jpg", alt: "디럭스 102" },
    { src: "/image/room5.jpg", alt: "프리미엄 102" },
    { src: "/image/room6.jpg", alt: "프리미엄 102" },
  ];

  const [mainImage, setMainImage] = useState(roomImages[0]);

  return (
    <div className="bg-white text-gray-500 w-full sm:max-w-2/3 h-auto min-h-screen p-5 mx-auto flex flex-col sm:flex-row my-5">
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="w-full sm:w-2/3 flex justify-center items-center px-5 py-5 bg-gray-100 rounded-lg shadow-lg"
      >
        <Image
          className="rounded-lg w-full h-full sm:min-h-[700px] min-h-[400px]"
          src={mainImage.src}
          alt={mainImage.alt}
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-col bg-gray-400 justify-between w-full sm:w-1/2 p-5 mt-5 sm:mt-0">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Room Information
          </h2>
          <div className="text-white text-start">
            <p className="mb-4">- 모든 객실은 16:00부터 입실가능합니다.</p>
            <p className="mb-4">- 일회용품과 웰컴음료 무료제공.</p>
            <p className="mb-4">- 전 객실 소독 및 방역을 실시중입니다.</p>
          </div>
        </div>
        <div
          className="flex flex-wrap justify-around"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="30"
          data-aos-duration="1000"
        >
          {roomImages.map((image, index) => (
            <div key={index} className="text-center mb-4">
              <Image
                className="rounded-lg cursor-pointer w-24 h-24 sm:w-[10vw] sm:h-[12vh]"
                src={image.src}
                alt={image.alt}
                width={150}
                height={150}
                onClick={() => setMainImage(image)}
              />
              <p className="text-[15px] p-2 text-white">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
