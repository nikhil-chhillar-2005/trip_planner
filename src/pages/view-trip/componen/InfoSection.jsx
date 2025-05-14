import { GetPlaceDetails } from "../../../Service/Globalapi";
import React, { useEffect } from "react";
const Photorefurl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photocache=new Map();
const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = React.useState("");
  
  useEffect(() => {
    if (trip) {
      getplacephoto();
    }
  }, [trip]);

  const getplacephoto = async () => {
    try {
      
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      if(photocache.has(trip?.userSelection?.location?.label)) {
        const cachedUrl = photocache.get(trip?.userSelection?.location?.label);
        setPhotoUrl(cachedUrl);
       
        return;
      }

      const result = await GetPlaceDetails(data);

      const photoref = Photorefurl.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );

      setPhotoUrl(photoref);
      photocache.set(trip?.userSelection?.location?.label, photoref);
    } catch (error) {
      console.log(error);
    }
  };
  const handleimageerror=()=>{
    setPhotoUrl("/travel.png");
  }

  return (
    <div>
      <img
      onError={handleimageerror}
        src={photoUrl}
        alt=""
        className="h-[340px] w-full object-center rounded-xl object-cover"
      />
      <div className="my-5 flex flex-col gap-5 ">
        <h1 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h1>
        <div className="flex gap-5">
          <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-500 text-sm  md:text-xl  ">
            🗓️ {trip?.userSelection?.noOfDays} Days
          </h2>
          <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-xl  ">
            💰 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-xl  ">
            ✈️ No. of Traveler {trip?.userSelection?.traveler}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
