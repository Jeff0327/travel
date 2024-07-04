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
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 px-4 py-2 font-medium text-white bg-gradient-to-r from-blue-300 to-purple-500 rounded-md hover:from-purple-300 hover:to-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full sm:w-1/2 px-4 py-2 font-medium text-white bg-gradient-to-r from-gray-500 to-gray-700 rounded-md hover:from-gray-600 hover:to-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
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
      </div>
    </div>
  );
}

export default SigninSection;
