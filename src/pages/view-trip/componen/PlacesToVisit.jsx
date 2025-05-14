import React, { useState, useEffect } from "react";
import DayCard from "./Day card";

const PlacesToVisit = ({ trip }) => {
  const [visibleDays, setVisibleDays] = useState(0); // Track how many DayCards are visible

  useEffect(() => {
    if (trip?.tripData?.dailyItinerary?.length > 0) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < trip.tripData.dailyItinerary.length) {
          setVisibleDays((prev) => prev + 1);
          currentIndex++;
        } else {
          clearInterval(interval); // Stop the interval when all DayCards are visible
        }
      }, 500); // Adjust delay (in milliseconds) between DayCards

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {trip?.tripData?.dailyItinerary?.map((item, dayIndex) => (
          dayIndex < visibleDays && ( // Render only if the DayCard is visible
            <div key={dayIndex} className="">
              <h2 className="font-medium text-lg">Day {item?.day}</h2>
              <DayCard item={item} />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;