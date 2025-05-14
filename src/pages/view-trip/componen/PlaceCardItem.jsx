import { Link } from 'react-router-dom'
import React,{useEffect} from 'react'
import { GetPlaceDetails } from "../../../Service/Globalapi";
const Photorefurl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photocache=new Map();
const PlaceCardItem = ({activity}) => {

      const [photoUrl, setPhotoUrl] = React.useState("");
  
      useEffect(() => {
        if (activity) {
          getplacephoto();
        }
      }, [activity]);
      
      const getplacephoto = async () => {
        try {
          if (photocache.has(activity?.placeName)) {
            const cachedUrl = photocache.get(activity?.placeName);
            setPhotoUrl(cachedUrl);
            return;
          }
          const data = {
            textQuery: activity?.placeName,
          };
          
    
          const result = await GetPlaceDetails(data);
    
          const photoref = Photorefurl.replace(
            "{NAME}",
            result.data.places[0].photos[3].name
          );
    
          setPhotoUrl(photoref);
          photocache.set(activity?.placeName, photoref);
        } catch (error) {
          console.log(error);
        }
      };

       const handleImageError = () => {
    console.warn("Image failed to load, using fallback image.");
    setPhotoUrl("/placealt.webp"); // Use fallback image
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+activity?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex items-center gap-5 hover:shadow-md transition-all hover:scale-105 cursor-pointer'>
        <img src={photoUrl||"/placealt.webp"} onError={handleImageError} alt="" className='h-[130px] w-[130px] rounded-xl' />
        <div>
            <h2 className='font-bold text-lg'>{activity?.placeName}</h2>
            <p className='text-sm text-gray-400'>{activity?.placeDetails}</p>
            <h2 className='my-2 text-sm'>🕰️ {activity?.timeToTravel}</h2>
            <h2 className='text-sm'>🎟️ {activity?.ticketPricing}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem