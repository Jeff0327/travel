"use client";
import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/custom-react-datepicker.css"; // Import custom CSS for styling
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useStore from "@/libs/store";

function ReservationSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const setSelectedRoom = useStore((state) => state.setSelectedRoom);

  const getAvailableRooms = useCallback(async () => {
    if (!selectedDates[0] || !selectedDates[1]) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/reservation/getReservation", {
        checkIn: selectedDates[0],
        checkOut: selectedDates[1],
      });
      if (response.status === 200) {
        setAvailableRooms(response.data.Rooms);
      }
    } catch (err) {
      console.log("Get Room Info Error", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDates]);

  useEffect(() => {
    getAvailableRooms();
  }, [getAvailableRooms]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedDates([start, end]);
  };

  const handleRoomClick = (index) => {
    setSelectedRoomIndex(index);
  };

  const handleReservation = () => {
    if (selectedRoomIndex !== null) {
      const selectedRoom = availableRooms[selectedRoomIndex];
      setSelectedRoom(selectedRoom);

      if (!session) {
        router.push("/auth/signin");
      } else {
        router.push(`/reservation/confirmation/${session.user.id}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        <div className="flex flex-col justify-start items-center bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 mb-4 md:mb-0 md:mr-4">
          <DatePicker
            className="mr-2"
            selected={selectedDates[0]}
            onChange={handleDateChange}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
            locale={ko}
          />
          <div className="flex flex-col p-2">
            <p>
              시작일:{" "}
              <strong>
                {selectedDates[0] && format(selectedDates[0], "yyyy-MM-dd")}
              </strong>
            </p>
            <p>
              종료일:{" "}
              <strong>
                {selectedDates[1] && format(selectedDates[1], "yyyy-MM-dd")}
              </strong>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full text-gray-600">
          <div className="mt-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : availableRooms.length > 0 ? (
              <div className="flex flex-col mt-4">
                <h3 className="bg-blue-300 text-white text-xl font-bold mb-2 p-2 rounded">
                  예약가능 객실정보
                </h3>
                {availableRooms.map((room, index) => (
                  <div
                    key={index}
                    onClick={() => handleRoomClick(index)}
                    className={`hover:cursor-pointer mb-2 flex flex-col md:flex-row items-center p-2 rounded ${
                      selectedRoomIndex === index
                        ? "border-2 border-red-500"
                        : "border"
                    }`}
                  >
                    {room.images && room.images.length > 0 && (
                      <div className="mr-4">
                        <Image
                          src={room.images[0]} // Display only the first image for simplicity
                          alt={`Room image ${index}`}
                          className="rounded"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{room.roomName}</p>
                      <p>가격: {room.price.toLocaleString("ko-KR")}원</p>
                      <p>최대인원: {room.maxOccupancy}</p>
                      <p>옵션: {room.options.join(", ")}</p>
                    </div>
                  </div>
                ))}
                {selectedRoomIndex !== null && (
                  <button
                    onClick={handleReservation}
                    className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    예약하기
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg">
                <p className="text-gray-700 text-lg font-semibold">
                  여행 일정을 선택해주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationSection;
