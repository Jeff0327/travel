"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt2 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { getSession } from "next-auth/react";
import IsLogin from "./IsLogin";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (err) {
        console.log("get session error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <RxCross2 className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenuAlt2 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              {/*web*/}
              <Link href="/">
                <div className="flex-row justify-around items-center hidden sm:flex h-8 my-2 w-auto">
                  <Image
                    src="/favicon.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto mr-2"
                  />
                  <span className="text-center">Travel</span>
                </div>
                {/*mobile*/}
                <div className="flex-row justify-around items-center flex sm:hidden h-8 w-auto">
                  <Image
                    src="/favicon.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto mr-2"
                  />
                  <span className="text-center">Travel</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6 flex-1">
              <div className="flex justify-around text-gray-800 font-bold">
                <Link
                  href="/main"
                  passHref
                  className="hover:bg-gradient-t from-green via-white to-yellow-500 px-10 py-4 rounded-md text-sm"
                >
                  홈
                </Link>
                <Link
                  href="/reservation"
                  passHref
                  className="hover:bg-gradient-t from-green via-white to-yellow-500 px-10 py-4 rounded-md text-sm"
                >
                  예약하기
                </Link>
                <Link
                  href="/"
                  passHref
                  className=" hover:bg-gradient-t from-green via-white to-yellow-500 px-10 py-4 rounded-md text-sm"
                >
                  상세정보
                </Link>
                {session && !isLoading ? (
                  <IsLogin session={session} />
                ) : (
                  <Link
                    href="/auth/signin"
                    passHref
                    className="hover:bg-gradient-t from-green via-white to-yellow-500 px-10 py-4 rounded-md text-sm"
                  >
                    로그인/회원가입
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-around text-gray-800 font-bold">
          <Link
            href="/main"
            passHref
            className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-b from-white/10 via-white/50 to-blue/50"
          >
            홈
          </Link>
          <Link
            href="/reservation"
            passHref
            className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-b from-white/10 via-white/50 to-blue/50"
          >
            예약하기
          </Link>
          <Link
            href="/"
            passHref
            className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-b from-white/10 via-white/50 to-blue/50"
          >
            상세정보
          </Link>
          <Link
            href="/auth/signin"
            passHref
            className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-b from-white/10 via-white/50 to-blue/50"
          >
            로그인/회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
