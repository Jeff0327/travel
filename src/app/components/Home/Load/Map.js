import React, { useEffect } from "react";
import ScriptLoader from "./ScriptLoader";

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 10,
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-[50vh]">
      <span className="flex flex-col justify-start items-start ml-2 p-4">
        <strong>오시는 길</strong>
        <strong>연락처 : 010-0000-0000</strong>
      </span>
      <iframe
        src="https://storage.googleapis.com/maps-solutions-at077set2b/locator-plus/hbuq/locator-plus.html"
        loading="lazy"
        className="w-full h-[50vh] border-0 shadow-lg rounded-lg"
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
