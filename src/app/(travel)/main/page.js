"use client";

import Load from "@/app/components/Home/Load";
import { useEffect } from "react";
function Main() {
  useEffect(() => {
    const onLoad = document.getElementById("home");
    if (onLoad) {
      window.scrollTo(0, onLoad.offsetTop);
    }
  }, []);
  return (
    <>
      <Load />
    </>
  );
}

export default Main;
