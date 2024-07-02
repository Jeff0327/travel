import React from "react";
import Header from "../components/Header";
import Toast from "../context/ToastContext";
import Footer from "../components/Footer";
import "aos/dist/aos.css";
import "@/styles/custom-swiper.css";
function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Toast />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
