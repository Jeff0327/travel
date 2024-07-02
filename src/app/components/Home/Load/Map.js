// src/app/components/Home/Load/map.js
import React, { useEffect } from "react";
import ScriptLoader from "./ScriptLoader";

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const { naver } = window;
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 10,
      });
    };

    if (window.naver) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []);

  return (
    <>
      <ScriptLoader
        url={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onLoad={() => {
          if (window.initMap) {
            window.initMap();
          }
        }}
      />
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
};

export default Map;
