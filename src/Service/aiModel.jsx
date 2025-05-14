

import { GoogleGenAI } from '@google/genai';

  const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

export const ChatSession = async(prompt)=>{
    try {
        const response =  await genAI.models.generateContentStream({
            model: 'gemini-2.0-flash',
            config:{
                responseMimeType: 'application/json',
               
            },
            contents:[
                {
                  role: 'user',
                  parts: [
                    {
                      text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.
            
            `,
                    },
                  ],
                },
                {
                  role: 'model',
                  parts: [
                    {
                      text: `Here's a breakdown of the thought process to generate the Las Vegas itinerary:
            
            1.  **Deconstruct the Request:**
            
                *   **Location:** Las Vegas
                *   **Duration:** 3 Days
                *   **Target Audience:** Couple
                *   **Budget:** Cheap
                *   **Output Format:** JSON
                *   **Key Information Needed for Hotels:**
                    *   HotelName
                    *   Hotel address
                    *   Price (approximate, indicating budget-friendly)
                    *   hotel image url
                    *   geo coordinates (latitude, longitude)
                    *   rating (e.g., 3-star, user reviews)
                    *   descriptions
                *   **Key Information Needed for Itinerary (per place):**
                    *   placeName
                    *   Place Details
                    *   Place Image Url
                    *   Geo Coordinates (latitude, longitude)
                    *   ticket Pricing (specify "Free" where applicable)
                    *   Time to travel (from previous location or general estimate)
                    *   Best time to visit
                *   **Structure:** 3-day plan, with each day having a sequence of activities.
            
            2.  **Brainstorming "Cheap" Las Vegas:**
            
                *   **Accommodation:** Off-Strip hotels are generally cheaper. Downtown (Fremont Street) offers good value. Some older Strip hotels can have good deals. Avoid peak weekends/holidays.
                *   **Food:** Food courts, buffets (though less common for "cheap" now, some still exist), happy hour deals, bringing own snacks/drinks.
                *   **Activities:**
                    *   **Free:** Walking the Strip, Bellagio Fountains, Conservatory, Volcano at Mirage, Fremont Street Experience, window shopping, people-watching, hiking (Red Rock Canyon, though might need a car/Uber).
                    *   **Low-cost:** Some smaller shows, observation decks (High Roller sometimes has deals), specific museum days, happy hour attractions.
                    *   **Avoid (for budget):** Expensive shows (Cirque), high-end clubs, extensive gambling, helicopter tours, fine dining.
                *   **Transportation:** Walking is key for the Strip/Downtown. RTC Deuce bus is good value. Uber/Lyft can add up.
            
            3.  **Hotel Selection Strategy (Cheap Budget):**
            
                *   Focus on properties known for value.
                *   Include a mix of Downtown and slightly off-Strip.
                *   Prioritize decent reviews even if basic amenities.
                *   *Initial thoughts:* Excalibur, Luxor (can be cheap), The LINQ (sometimes), Downtown Grand, El Cortez, Golden Nugget (can be pricier but good value sometimes), STRAT (often has deals).
                *   Need to find actual addresses, image URLs, geo-coordinates, and placeholder prices. A quick search for "cheap Las Vegas hotels" would be helpful here. For this exercise, I'll use placeholder/example data, but in a real scenario, I'd look up current info.
            
            4.  **Itinerary Design - Day by Day:**
            
                *   **Day 1: Arrival & South/Mid Strip Exploration**
                    *   **Focus:** Iconic, free attractions.
                    *   **Sequence:**
                        1.  Check-in.
                        2.  "Welcome to Fabulous Las Vegas" sign (classic, free, might need Uber/bus).
                        3.  South Strip walk: Luxor, Excalibur, New York-New York.
                        4.  Mid-Strip: Bellagio Fountains & Conservatory (free, iconic).
                        5.  Evening: Explore more of Mid-Strip (Paris, Venetian exteriors).
                    *   **Food:** Budget-friendly options in hotel food courts or nearby fast-casual.
            
                *   **Day 2: North Strip & Downtown**
                    *   **Focus:** Contrasting experiences, more free/low-cost entertainment.
                    *   **Sequence:**
                        1.  Morning: North Strip walk – Venetian/Palazzo (interior canals, Grand Canal Shoppes), Mirage Volcano (if showtimes work).
                        2.  Afternoon/Evening: Downtown Las Vegas – Fremont Street Experience (free light show, street performers).
                        3.  Optional: Container Park (free entry, unique shops).
                    *   **Food:** Happy hour deals Downtown, cheaper eats on Fremont East.
            
                *   **Day 3: Off-Strip Charm & Departure Prep**
                    *   **Focus:** Something different, maybe a bit of nature or a unique museum, then prepare for departure.
                    *   **Alternative 1 (Nature):** Red Rock Canyon (requires transport, small fee). *Decided against for a super cheap, walking-focused itinerary unless explicitly requested.*
                    *   **Alternative 2 (Quirky):** The Neon Museum (unique, ticketed but not exorbitant). This fits the Vegas vibe well.
                    *   **Alternative 3 (Relaxed):** Pool time (if hotel has one), last-minute souvenir shopping.
                    *   **Sequence:**
                        1.  Morning: The Neon Museum (unique Vegas history).
                        2.  Afternoon: Relax, pack, maybe some last-minute cheap eats or souvenir hunting.
                        3.  Departure.
                    *   **Food:** Leftover budget or a final cheap meal.
            
            5.  **Populating Details for JSON:**
            
                *   **Place Names:** Be specific (e.g., "Bellagio Conservatory & Botanical Gardens" not just "Bellagio").
                *   **Place Details:** Brief, enticing descriptions.
                *   **Image URLs:** Placeholder image search (e.g., "Bellagio Fountains Las Vegas"). Use generic, widely available images.
                *   **Geo Coordinates:** Use Google Maps to get approximate lat/long for each location.
                *   **Ticket Pricing:** "Free" for most, estimate for paid attractions like Neon Museum.
                *   **Time to Travel:** Rough estimates between sequential locations, factoring in walking or short bus rides.
                *   **Best Time to Visit:** Evening for light shows, daytime for walking/exploring, specific showtimes.
            
            6.  **JSON Structure Planning:**
            
                \`\`\`json
                {
                  "tripDetails": {
                    "location": "Las Vegas",
                    "duration": "3 Days",
                    "travelerType": "Couple",
                    "budget": "Cheap"
                  },
                  "hotelOptions": [
                    {
                      "HotelName": "...",
                      "HotelAddress": "...",
                      "Price": "Approx. $X - $Y per night (varies)",
                      "HotelImageUrl": "...",
                      "GeoCoordinates": { "latitude": 0.0, "longitude": 0.0 },
                      "Rating": "...",
                      "Description": "..."
                    }
                    // ... more hotels
                  ],
                  "dailyItinerary": [
                    {
                      "day": 1,
                      "theme": "Iconic Strip South & Center",
                      "activities": [
                        {
                          "placeName": "...",
                          "placeDetails": "...",
                          "placeImageUrl": "...",
                          "geoCoordinates": { "latitude": 0.0, "longitude": 0.0 },
                          "ticketPricing": "...",
                          "timeToTravel": "...", // from previous activity
                          "bestTimeToVisit": "..."
                        }
                        // ... more activities
                      ]
                    }
                    // ... Day 2, Day 3
                  ]
                }
                \`\`\`
            
            7.  **Refinement and Review:**
            
                *   **Budget Check:** Are the suggested activities and hotels truly "cheap"? Are there enough free options?
                *   **Pacing:** Is the itinerary too rushed or too empty?
                *   **Logistics:** Does the flow make sense geographically? Minimize backtracking.
                *   **Variety:** Is there a good mix of experiences?
                *   **JSON Validity:** Double-check syntax (commas, brackets, quotes). Use a JSON validator.
                *   **Image URLs:** Ensure they are direct image links if possible (though often, search result page links are used as placeholders for actual image hosting).
                *   **Price Caveats:** Add disclaimers that prices fluctuate.
                *   **Geo-coordinates:** Be as accurate as possible. For a real app, these would be precise.
                *   **Hotel descriptions:** Make them appealing but realistic for budget options.
            
            **(Self-Correction during the process):**
            *   Initially, I might have thought of including a cheap show, but finding consistently "cheap" shows with fixed prices for a generic plan is hard. Better to focus on free entertainment and low-cost attractions.
            *   Red Rock Canyon is great, but transport costs (Uber/rental) can push it out of a "super cheap" plan for a couple without a car. Decided to make it an optional suggestion or replace it with something more accessible like the Neon Museum.
            *   Emphasize walking and the Deuce bus for transport.
            
            By following these steps, the detailed JSON output can be constructed systematically.`,
                    },
                    {
                      text: `Okay, here's a budget-friendly 3-day Las Vegas travel plan for a couple, focusing on free and low-cost experiences, presented in JSON format.
            
            **Important Notes for a Cheap Trip:**
            
            1.  **Hotel Prices:** Prices fluctuate wildly based on day of the week, events, and season. The prices listed are rough estimates for budget-friendly options, often found mid-week or during off-peak times. Book in advance and be flexible with dates.
            2.  **Resort Fees:** Nearly all Las Vegas hotels charge a mandatory daily resort fee ($25-$50+), which is NOT included in the nightly room rate. Factor this into your budget!
            3.  **Food:** Utilize food courts, happy hour deals, and consider buying some snacks/drinks from a convenience store (like Walgreens or CVS on the Strip) to save money.
            4.  **Transportation:** Walking will be your primary mode. The Deuce bus runs up and down the Strip and to Downtown and is a cost-effective option. Ride-shares can add up quickly.
            5.  **Free Entertainment:** Las Vegas excels at free spectacles. Prioritize these!
            6.  **Gambling:** Set a strict, small budget if you choose to gamble, or skip it entirely to save money.
            
            \`\`\`json
            {
              "tripDetails": {
                "location": "Las Vegas, Nevada, USA",
                "duration": "3 Days",
                "travelerType": "Couple",
                "budget": "Cheap"
              },
              "hotelOptions": [
                {
                  "HotelName": "Excalibur Hotel & Casino",
                  "HotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
                  "Price": "Approx. $30 - $100+ per night (varies greatly)",
                  "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Excalibur_Hotel_Casino_Las_Vegas_2020.jpg/1200px-Excalibur_Hotel_Casino_Las_Vegas_2020.jpg",
                  "GeoCoordinates": {
                    "latitude": 36.0987,
                    "longitude": -115.1755
                  },
                  "Rating": "3-Star",
                  "Description": "Iconic castle-themed hotel on the south end of the Strip. Offers basic rooms, a large casino, food court, and family-friendly entertainment. Good value for its location."
                },
                {
                  "HotelName": "The LINQ Hotel + Experience",
                  "HotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
                  "Price": "Approx. $40 - $150+ per night (varies greatly)",
                  "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/73/The_Linq_Hotel_%26_Casino_Sign.jpg",
                  "GeoCoordinates": {
                    "latitude": 36.1178,
                    "longitude": -115.1708
                  },
                  "Rating": "3.5-Star",
                  "Description": "Modern, vibrant hotel in the heart of the Strip. Known for the High Roller observation wheel and LINQ Promenade. Rooms are contemporary but can be small."
                },
                {
                  "HotelName": "Flamingo Las Vegas Hotel & Casino",
                  "HotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
                  "Price": "Approx. $35 - $120+ per night (varies greatly)",
                  "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Flamingo_Las_Vegas_Hotel_Exterior.jpg/1024px-Flamingo_Las_Vegas_Hotel_Exterior.jpg",
                  "GeoCoordinates": {
                    "latitude": 36.1162,
                    "longitude": -115.1710
                  },
                  "Rating": "3-Star",
                  "Description": "Classic Vegas hotel with a prime center-Strip location. Features a Caribbean theme, a wildlife habitat with flamingos, and a lively pool scene. Rooms vary in quality."
                },
                {
                  "HotelName": "Downtown Grand Hotel & Casino",
                  "HotelAddress": "206 N 3rd St, Las Vegas, NV 89101, USA",
                  "Price": "Approx. $50 - $130+ per night (varies greatly)",
                  "HotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/e0/5a/e9/exterior.jpg?w=1200&h=-1&s=1",
                  "GeoCoordinates": {
                    "latitude": 36.1720,
                    "longitude": -115.1418
                  },
                  "Rating": "3.5-Star",
                  "Description": "Modern boutique-style hotel in Downtown Las Vegas, a short walk from Fremont Street Experience. Offers updated rooms, a rooftop pool, and good dining options."
                }
              ],
              "dailyItinerary": [
                {
                  "day": 1,
                  "theme": "South & Mid-Strip Exploration & Iconic Sights",
                  "activities": [
                    {
                      "placeName": "Welcome to Fabulous Las Vegas Sign",
                      "placeDetails": "The iconic photo opportunity. It's a bit south of the main Strip hotels, so consider it upon arrival or via a short bus/rideshare trip. There's a small parking lot.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Welcome_to_Fabulous_Las_Vegas_sign.jpg/1024px-Welcome_to_Fabulous_Las_Vegas_sign.jpg",
                      "geoCoordinates": {
                        "latitude": 36.0820,
                        "longitude": -115.1728
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "15-20 mins by bus/car from mid-Strip",
                      "bestTimeToVisit": "Morning to avoid long lines and harsh sun, or at dusk."
                    },
                    {
                      "placeName": "Explore South Strip Hotels (Exteriors & Lobbies)",
                      "placeDetails": "Walk around and marvel at the themed architecture of hotels like Luxor (pyramid & sphinx), Excalibur (castle), and New York-New York (Manhattan skyline). Enter lobbies to see unique decor.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Las_Vegas_NY_NY_Hotel.jpg/1024px-Las_Vegas_NY_NY_Hotel.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1023,
                        "longitude": -115.1745
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "Walkable from Welcome Sign (long walk) or after check-in",
                      "bestTimeToVisit": "Daytime for walking, early evening for lights."
                    },
                    {
                      "placeName": "Bellagio Conservatory & Botanical Gardens",
                      "placeDetails": "A stunning indoor garden display that changes seasonally. Absolutely beautiful and free to enter. Located inside the Bellagio.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bellagio_Conservatory_Spring_Display_2019.jpg/1024px-Bellagio_Conservatory_Spring_Display_2019.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1132,
                        "longitude": -115.1767
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "15-20 mins walk from New York-New York",
                      "bestTimeToVisit": "Anytime, but can be crowded mid-day."
                    },
                    {
                      "placeName": "Bellagio Fountains Show",
                      "placeDetails": "Iconic water show synchronized to music and lights on Lake Bellagio. Multiple shows daily, more frequent in the evening.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bellagio_fountains_Las_Vegas.jpg/1024px-Bellagio_fountains_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1127,
                        "longitude": -115.1740
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "Located in front of Bellagio",
                      "bestTimeToVisit": "Evening for the best atmosphere with lights. Check daily schedule."
                    },
                    {
                      "placeName": "Explore Paris Las Vegas & The Venetian (Exteriors/Grand Canal Shoppes)",
                      "placeDetails": "Walk by the Eiffel Tower replica at Paris Las Vegas. Then, head to The Venetian to see the outdoor canals, Rialto Bridge replica, and wander through the Grand Canal Shoppes with its indoor canals and gondolas (rides are extra).",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Eiffel_Tower_Las_Vegas_2008.JPG/800px-Eiffel_Tower_Las_Vegas_2008.JPG",
                      "geoCoordinates": {
                        "latitude": 36.1125,  "longitude": -115.1707  
                      },
                      "ticketPricing": "Free to explore (gondola rides extra)",
                      "timeToTravel": "10-15 mins walk from Bellagio to Paris, another 15-20 mins to Venetian",
                      "bestTimeToVisit": "Late afternoon to evening."
                    }
                  ]
                },
                {
                  "day": 2,
                  "theme": "North Strip Wonders & Downtown Frenzy",
                  "activities": [
                    {
                      "placeName": "Mirage Volcano Show",
                      "placeDetails": "A spectacular show with fireballs, water effects, and a soundtrack. Located in front of The Mirage.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Mirage_Volcano_Show_Las_Vegas.jpg/1024px-Mirage_Volcano_Show_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1212,
                        "longitude": -115.1742
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "Walkable from mid-Strip hotels, or a short bus ride.",
                      "bestTimeToVisit": "Evening, usually on the hour from 7 PM or 8 PM. Check schedule as it can vary."
                    },
                    {
                      "placeName": "Forum Shops at Caesars Palace",
                      "placeDetails": "An impressive themed mall with high-end stores, Roman statues, a 'sky' ceiling that changes, and the Fall of Atlantis animatronic show (free). Fun for window shopping.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Forum_Shops_Trevi_Fountain.jpg/1024px-Forum_Shops_Trevi_Fountain.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1178,
                        "longitude": -115.1754
                      },
                      "ticketPricing": "Free (Fall of Atlantis show is free)",
                      "timeToTravel": "5-10 mins walk from The Mirage",
                      "bestTimeToVisit": "Daytime or early evening."
                    },
                    {
                      "placeName": "Travel to Downtown Las Vegas (Fremont Street)",
                      "placeDetails": "Take the Deuce bus (RTC) from the Strip to Downtown. It's the most budget-friendly way.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Las_Vegas_Deuce_bus.jpg/1024px-Las_Vegas_Deuce_bus.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1710,  "longitude": -115.1450 
                      },
                      "ticketPricing": "Approx. $6 for a 2-hour pass, $8 for 24-hour pass for Deuce/SDX bus.",
                      "timeToTravel": "30-45 minutes by bus from mid-Strip",
                      "bestTimeToVisit": "Late afternoon to transition into evening."
                    },
                    {
                      "placeName": "Fremont Street Experience",
                      "placeDetails": "A pedestrian mall with a massive LED canopy (Viva Vision light shows), street performers, live music on multiple stages, and a vibrant, old-school Vegas atmosphere. Ziplines are available (extra cost).",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fremont_Street_Experience_-_Viva_Vision_-_Las_Vegas.jpg/1024px-Fremont_Street_Experience_-_Viva_Vision_-_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1707,
                        "longitude": -115.1450
                      },
                      "ticketPricing": "Free (Viva Vision shows, street performers). Zipline extra.",
                      "timeToTravel": "Arrive directly by bus.",
                      "bestTimeToVisit": "Evening, especially when Viva Vision shows run (hourly from dusk)."
                    },
                    {
                      "placeName": "Downtown Container Park",
                      "placeDetails": "An open-air shopping center and park made of shipping containers. Features boutique shops, unique food/drink options, a kids' play area, and often free live music. Look for the giant fire-breathing praying mantis out front.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Downtown_Container_Park_Las_Vegas.jpg/1024px-Downtown_Container_Park_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1677,
                        "longitude": -115.1378
                      },
                      "ticketPricing": "Free entry (food, drinks, shopping extra).",
                      "timeToTravel": "5-10 mins walk from Fremont Street Experience.",
                      "bestTimeToVisit": "Late afternoon or evening."
                    }
                  ]
                },
                {
                  "day": 3,
                  "theme": "Unique Vegas & Sweet Treats",
                  "activities": [
                    {
                      "placeName": "Flamingo Wildlife Habitat",
                      "placeDetails": "A serene garden oasis at the Flamingo Hotel, home to Chilean flamingos, Brown Pelicans, swans, ducks, koi fish, and turtles. A peaceful escape from the casino buzz.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Flamingo_Wildlife_Habitat_Las_Vegas.JPG/1024px-Flamingo_Wildlife_Habitat_Las_Vegas.JPG",
                      "geoCoordinates": {
                        "latitude": 36.1169,
                        "longitude": -115.1703
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "Located at Flamingo Hotel (mid-Strip). Walkable or short bus ride.",
                      "bestTimeToVisit": "Morning or late afternoon when animals might be more active."
                    },
                    {
                      "placeName": "M&M's World Las Vegas",
                      "placeDetails": "Four floors of colorful M&M's merchandise, a free 3D movie, and a create-your-own M&M's station. Fun for a quick, sweet visit.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/M%26M%27s_World_Las_Vegas_%28cropped%29.jpg/800px-M%26M%27s_World_Las_Vegas_%28cropped%29.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1062,
                        "longitude": -115.1731
                      },
                      "ticketPricing": "Free entry (purchases are extra)",
                      "timeToTravel": "15-20 mins walk from Flamingo (south on the Strip)",
                      "bestTimeToVisit": "Anytime, less crowded in the morning."
                    },
                    {
                      "placeName": "Coca-Cola Store Las Vegas",
                      "placeDetails": "Next to M&M's World, this store offers a wide array of Coca-Cola merchandise and an 'Around the World' tasting tray where you can sample 16 different international Coke beverages (for a fee, ~$15-20).",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Coca-Cola_Store_Las_Vegas_Nevada.jpg/800px-Coca-Cola_Store_Las_Vegas_Nevada.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1058,
                        "longitude": -115.1730
                      },
                      "ticketPricing": "Free entry (tasting tray and merchandise extra)",
                      "timeToTravel": "1 min walk from M&M's World",
                      "bestTimeToVisit": "Anytime."
                    },
                    {
                      "placeName": "Window Shopping & People Watching",
                      "placeDetails": "Spend the afternoon casually strolling through different hotel casinos (e.g., Aria, Cosmopolitan for modern art and chic design), window shopping at Miracle Mile Shops (Planet Hollywood) or Grand Canal Shoppes (Venetian), and simply enjoying the unique Vegas atmosphere.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Miracle_Mile_Shops_Planet_Hollywood_Las_Vegas.jpg/1024px-Miracle_Mile_Shops_Planet_Hollywood_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1105, "longitude": -115.1720 
                      },
                      "ticketPricing": "Free",
                      "timeToTravel": "Walkable throughout the Strip",
                      "bestTimeToVisit": "Afternoon."
                    },
                    {
                      "placeName": "Optional: The Neon Museum (Boneyard)",
                      "placeDetails": "If your budget allows for one paid attraction, this is a unique Vegas experience. It's an outdoor museum showcasing iconic Las Vegas signs from the past. Requires booking tickets in advance. A bit off-Strip, so plan transport.",
                      "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Neon_Museum%2C_Las_Vegas.jpg/1024px-Neon_Museum%2C_Las_Vegas.jpg",
                      "geoCoordinates": {
                        "latitude": 36.1827,
                        "longitude": -115.1358
                      },
                      "ticketPricing": "Approx. $20-30 for daytime general admission, more for guided night tours.",
                      "timeToTravel": "15-20 mins by car/rideshare from Downtown, or longer by bus.",
                      "bestTimeToVisit": "Late afternoon for good lighting, or evening for guided tours (if budget allows)."
                    }
                  ]
                }
              ]
            }
            \`\`\``,
                    },
                  ],
                },
                {
                  role: 'user',
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ], 
          });
          let result='';
          for await (const chunk of response) {
            result += chunk.candidates[0].content.parts[0].text;
          }
          
          return result;
    } catch (error) {
        console.log(error);
        
    }
 
 
}


