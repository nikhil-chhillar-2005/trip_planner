import React, { useState, useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

const DayCard = ({ item }) => {
  const [visibleActivities, setVisibleActivities] = useState(0); // Track how many PlaceCardItems are visible

  useEffect(() => {
    if (item?.activities?.length > 0) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < item.activities.length) {
          setVisibleActivities((prev) => prev + 1);
          currentIndex++;
        } else {
          clearInterval(interval); // Stop the interval when all PlaceCardItems are visible
        }
      }, 500); // Adjust delay (in milliseconds) between PlaceCardItems

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [item]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {item?.activities?.map((activity, activityIndex) => (
        activityIndex < visibleActivities && ( // Render only if the PlaceCardItem is visible
          <div key={activityIndex} className="my-1">
            <h2 className="text-orange-700 font-medium text-xl">
              {activity?.bestTimeToVisit}
            </h2>
            <PlaceCardItem activity={activity} />
          </div>
        )
      ))}
    </div>
  );
};

export default DayCard;