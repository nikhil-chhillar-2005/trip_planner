import React,{useEffect} from 'react'
import { GetPlaceDetails } from "../../../Service/Globalapi";
const Photorefurl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photocache=new Map();
const Hotelcard = ({hotel}) => {

    const [photoUrl, setPhotoUrl] = React.useState("");

    const handleImageerror=()=>{
      setPhotoUrl("/alt.png");
    }
    useEffect(() => {
      if (hotel) {
        getplacephoto();
      }
    }, [hotel]);
    const getplacephoto = async () => {
      try {
        const data = {
          textQuery: hotel?.HotelName,
        };
        if(photocache.has(hotel?.HotelName)) {
          const cachedUrl = photocache.get(hotel?.HotelName);
          setPhotoUrl(cachedUrl);
         
          return;
        }
  
        const result = await GetPlaceDetails(data);
  
        const photoref = Photorefurl.replace(
          "{NAME}",
          result.data.places[0].photos[3].name
        );
  
        setPhotoUrl(photoref);
        photocache.set(hotel?.HotelName, photoref);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="hover:scale-105 transition-all cursor-pointer ">
              <img onError={handleImageerror} src={photoUrl||'/alt.png'} alt="" className=" w-[200px] h-[200px] object-cover object-center rounded-xl" />
              <div className="my-2 flex flex-col gap-3">
                <h2 className="font-medium">{hotel?.HotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel?.HotelAddress}
                </h2>
                <h2 className="text-sm">💰 {hotel?.Price}</h2>
                <h2 className="text-sm">⭐ {hotel?.Rating}</h2>
              </div>
            </div>
  )
}

export default Hotelcard