import axios from "axios"

const baseurl="https://places.googleapis.com/v1/places:searchText"

const config={
    headers:{
        'content-Type':"application/json",
        'X-Goog-Api-Key':import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export  const GetPlaceDetails=(data)=>axios.post(baseurl,data,config)