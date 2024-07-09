"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
function AdminPage() {
  const router = useRouter();
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-around items-center">
          <Image
            onClick={() => {
              router.push("/");
            }}
            src="/favicon.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-8 w-auto hover:cursor-pointer"
          />

          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/admin/reservations" className="hover:underline">
                  예약목록
                </Link>
              </li>
              <li>
                <Link href="/admin/rooms" className="hover:underline">
                  룸
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="hover:underline">
                  유저정보
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex flex-col">
        <ul>목록1</ul>
        <ul>목록2</ul>
      </div>
    </div>
  );
}

export default AdminPage;
