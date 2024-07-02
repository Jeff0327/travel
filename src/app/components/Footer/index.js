import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-col relative bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center px-4">
        <div className="mb-4 flex flex-col sm:flex-row justify-center sm:space-x-4">
          <Link
            className="text-gray-400 hover:text-gray-200 my-2 sm:my-0"
            href="/privacy-policy"
          >
            개인정보처리방침
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-200 my-2 sm:my-0"
            href="/terms-of-service"
          >
            이용약관
          </Link>
        </div>
        <div className="mb-4 text-center">
          <p>주소: 서울특별시 강남구 테헤란로 123</p>
          <p>고객센터: 1234-5678</p>
          <p>대표: 홍길동</p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            COPYRIGHT Travel. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
