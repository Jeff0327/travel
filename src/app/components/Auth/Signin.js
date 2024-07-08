"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SigninSection() {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: sessionStorage.getItem("previousPage") || "/",
      });
      console.log("로그인 성공!");
    } catch (err) {
      console.error("로그인 에러:", err);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-50">
      <Image
        src="/image/backImg_1.jpg"
        alt="Background"
        width={1920}
        height={1080}
        className="absolute inset-0 object-cover w-full h-full blur-sm"
      />
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white bg-opacity-75 backdrop-blur-lg rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-4">
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex flex-row items-center justify-center w-full px-4 py-2 font-bold text-gray-900 bg-white rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <FcGoogle className="w-6 h-6 mr-2" />
              구글로 로그인하기
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <span>로그인에 문제가 있으신가요?</span>
          <a href="/contact" className="ml-2 text-blue-500 hover:text-blue-700">
            문의하기
          </a>
        </div>
      </div>
    </div>
  );
}

export default SigninSection;
