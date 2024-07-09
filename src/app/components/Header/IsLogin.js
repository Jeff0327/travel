import Image from "next/image";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

function IsLogin({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="hover:cursor-pointer flex items-center hover:bg-gradient-to-r from-green via-white to-yellow-500 px-10 py-2 rounded-md text-sm"
      >
        <Image
          src={session.user.image}
          width={30}
          height={30}
          alt="userImage"
          className="rounded-full mr-1"
        />
        <p className="text-gray-800 font-bold">{session.user.email}</p>
      </div>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 font-normal text-sm">
          {session.user.isAdmin && (
            <Link
              href="/admin"
              passHref
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Admin Page
            </Link>
          )}
          <Link
            href="/my-reservations"
            passHref
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            내 예약정보
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default IsLogin;
