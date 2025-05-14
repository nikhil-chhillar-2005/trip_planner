import { db } from '@/src/Service/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UserTripcard from './userTripcard';
import Header from '@/components/custom/Header';

function Mytrips() {
  const [usertrips, setUserTrips] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0); // Track how many cards are visible

  useEffect(() => {
    getusertrips();
  }, []);

  useEffect(() => {
    if (usertrips.length > 0) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < usertrips.length) {
          setVisibleCards((prev) => prev + 1);
          currentIndex++;
        } else {
          clearInterval(interval); // Stop the interval when all cards are visible
        }
      }, 500); // Adjust delay (in milliseconds) between cards

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [usertrips]);

  const getusertrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      if (!user) {
        console.log('No user found');
        return;
      }

      const q = query(collection(db, 'trip'), where('userEmail', '==', user?.email));

      setUserTrips([]); // Clear previous trips

      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips); // Set all trips at once
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header/>
    
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-center">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {usertrips.length > 0
          ? usertrips.slice(0, visibleCards).map((trip, index) => (
              <UserTripcard key={index} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded"
              ></div>
            ))}
      </div>
    </div>
    </div>
  );
}

export default Mytrips;