export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'Chase dreams, meet strangers, and fall in love with the world',
      icon: '✈️',
      people:'1 people'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Share unforgettable moments with your partner',
      icon: '🥂',
        people:'2 people',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'Create lasting memories with your loved ones',
      icon: '🏡',
      people:'3 to 5 people',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'Experience epic adventures with your crew',
      icon: '⛵',
      people:'5 to 10 people',
    }
  ];
  
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💵', 
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep cost on the average side',
      icon: '💰', 
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Dont worry about cost',
      icon: '💸', 
    }
  ];
  export const Aiprompt='Generate Travel Plan for Location: {location}, for {totaldays} days for {traveler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, correct hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details,correct Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.';
