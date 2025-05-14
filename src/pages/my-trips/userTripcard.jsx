import React,{useEffect} from 'react'
import { GetPlaceDetails } from "../../Service/Globalapi";
import { Link } from 'react-router-dom';
const Photorefurl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photocache=new Map();
function UserTripcard({trip}) {
    
    
    const [photoUrl, setPhotoUrl] = React.useState("");
    const [isImagerendered,setisIagerendered]=React.useState(false);
      const handleimageError=()=>{
        setPhotoUrl("/travel.png");
        
    }
          useEffect(() => {
            if (trip&&!isImagerendered) {
              getplacephoto();
            }
          }, [trip,isImagerendered]);
          
          const getplacephoto = async () => {
            try {
                const label=trip?.userSelection?.location?.label;
              
              const data = {
                textQuery: label,
              };
              if (photocache.has(label)) {
                const cachedUrl = photocache.get(label);
                setPhotoUrl(cachedUrl);
                return;
              }
        
              const result = await GetPlaceDetails(data);
        
              const photoref = Photorefurl.replace(
                "{NAME}",
                result.data.places[0].photos[3].name
              );
                photocache.set(label, photoref);
              setPhotoUrl(photoref);
              setisIagerendered(true);
            } catch (error) {
              console.log(error);
            }
          };
  return (
    <Link to={`/view-trip/${trip?.tripId}`} >
    <div className='hover:scale-105 transition-all mt-5 p-3  flex justify-center flex-col items-center cursor-pointer hover:shadow-md'> 
        <img src={photoUrl} onError={handleimageError} alt="" className='object-cover w-full h-[220px] rounded-xl' />
        <div className='text-center'>
            <h2 className='font-bold text-lg '>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm test-gray-500'>{trip?.userSelection?.noOfDays} Daye Trip with {trip?.userSelection?.budget} budget </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripcard