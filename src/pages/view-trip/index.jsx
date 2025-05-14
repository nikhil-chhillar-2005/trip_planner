import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {db} from "../../Service/firebaseConfig"
import { doc, getDoc } from "firebase/firestore";
import InfoSection from './componen/InfoSection';
import Hotels from './componen/Hotels';
import PlacesToVisit from './componen/PlacesToVisit';
import Footer from './componen/Footer';
import Header from '@/components/custom/Header';
const ViewTrip = () => {

    const [trip, settrip] = React.useState([]);
    const {tripid} = useParams();
    useEffect(()=>{
        tripid && getTripData();
    },[tripid])

    const getTripData = async () => {
        try {
            const docRef = doc(db, "trip", tripid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
               
                settrip(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <Header/>
    
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 '>
        {/* Information */}

        <InfoSection trip={trip} />

        {/* Recomended hoted */}

        <Hotels  trip={trip}/>

        {/* Days plan */}
        <PlacesToVisit trip={trip} />

        {/* footer */}
        <Footer />
    </div>
    </div>
  )
}

export default ViewTrip