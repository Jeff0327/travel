"use client";

import useStore from "@/libs/store";
import Image from "next/image";
import React, { useState } from "react";

function ConfirmationSection() {
  const selectedRoom = useStore((state) => state.selectedRoom);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "이름을 입력해주세요.";
    if (!formData.contact) newErrors.contact = "연락처를 입력해주세요.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form submitted:", formData, "Selected Room:", selectedRoom);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">예약 확인</h2>
        {selectedRoom ? (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">선택한 객실 정보</h3>
            {selectedRoom.images && selectedRoom.images.length > 0 && (
              <div className="mt-2">
                <Image
                  width={300}
                  height={200}
                  src={selectedRoom.images[0]}
                  alt="Room Image"
                  className="rounded w-full h-auto"
                />
              </div>
            )}
            <p>Room Name: {selectedRoom.roomName}</p>
            <p>가격: {selectedRoom.price}</p>
            <p>최대인원: {selectedRoom.maxOccupancy}</p>
            <p>옵션: {selectedRoom.options.join(", ")}</p>
          </div>
        ) : (
          <p className="text-red-500">객실이 선택되지 않았습니다.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contact">
              연락처
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            결제하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmationSection;
