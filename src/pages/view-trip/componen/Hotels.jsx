import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hotelcard from "./Hotelcard";

const Hotels = ({ trip }) => {
  const [visibleCards, setVisibleCards] = useState(0); // Track how many cards are visible

  useEffect(() => {
    if (trip?.tripData?.hotelOptions?.length > 0) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < trip.tripData.hotelOptions.length) {
          setVisibleCards((prev) => prev + 1);
          currentIndex++;
        } else {
          clearInterval(interval); // Stop the interval when all cards are visible
        }
      }, 500); // Adjust delay (in milliseconds) between cards

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-8 ">
        {trip.tripData?.hotelOptions?.slice(0, visibleCards).map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.HotelName +
              "," +
              hotel.HotelAddress
            }
            target="_blank"
          >
            <Hotelcard hotel={hotel} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;