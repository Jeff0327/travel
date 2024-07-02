"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, parseISO } from "date-fns";
import { enUS, ko } from "date-fns/locale";
import "@/styles/custom-calendar.css"; // Import custom CSS for styling

const locales = { en: enUS, ko: ko };

function ReservationSection() {
  const [date, setDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);
  const [locale, setLocale] = useState("en");
  const chargedData = {
    "2024-07-17": true,
    "2024-07-18": true,
    // Add more dates here
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = format(date, "yyyy-MM-dd");
      if (chargedData[dateString]) {
        return "charged";
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const dateString = format(date, "yyyy-MM-dd");
      return chargedData[dateString] || false;
    }
    return false;
  };

  useEffect(() => {
    // Determine the locale based on the user's preference or browser settings
    const userLocale = navigator.language || "en-US";
    setLocale(userLocale.startsWith("ko") ? "ko" : "en");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="flex flex-row w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mr-4">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar"
            tileClassName={tileClassName}
            tileDisabled={tileDisabled}
            locale={locales[locale]}
          />
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-1/2 flex flex-col items-center justify-center text-white">
          <p>Additional Information or Content</p>
        </div>
      </div>
      <div className="mt-6">
        <p>Selected Date: {date.toDateString()}</p>
        <button
          onClick={toggleDetails}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Show Reservation Details
        </button>
        {showDetails && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Reservation Details</h3>
            <p>Details about the reservation will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationSection;
