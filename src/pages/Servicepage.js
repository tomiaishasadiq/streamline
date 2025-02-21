import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
console.log("API Key:", API_KEY);

const serviceMappings = {
  hulu:453,
  netflix: 213,
  prime: 1024,
  appletv: 2552,
  paramount: 4330,
  disney: 2739,
  hbomax:49,
  skytv: 1063,
  starz: 318,
  peacock: 3353

};
const Servicepage = () => {
  const { serviceId } = useParams(); // Get the service ID from the URL
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingShows() {
      const networkId = serviceMappings[serviceId]; // Get the network ID
      if (!networkId) return;

      let allShows = [];
      let page = 1;

      // Get the current date in the required format (YYYY-MM-DD)
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in format 'YYYY-MM-DD'

      try {
        // Continue fetching while there are more pages
        while (true) {
          const response = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${networkId}&air_date.gte=${currentDate}&page=${page}`
          );
          const data = await response.json();

          // Append the new results to the array
          allShows = [...allShows, ...data.results];

          // If there are no more pages, stop fetching
          if (data.page >= data.total_pages) {
            break;
          }

          page++;
        }

        setShows(allShows); // Update the state with all fetched shows
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingShows();
  }, [serviceId]);

  return (
    <main className="max-w-7xl mx-auto py-7">
      <h2 className="text-center mb-5">Upcoming Shows on {serviceId}</h2>
  
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : shows.length === 0 ? (
        <p className="text-center">No shows available.</p>
      ) : (
        <div className="space-y-5">
          {shows.map((show) => (
            <div
              key={show.id}
              className="flex items-center max-w-7xl mx-auto h-80 bg-white rounded-lg shadow-md p-4"
            >
             
              <div className="w-40 h-56 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
            </div>
              <div className="flex-1 flex-col justify-between ml-6">
                <h3 className="text-xl font-bold">{show.name}</h3>
                <p className="text-sm font-bold text-gray-600">{`Overview: ${show.overview}`}</p>
                {/* <p className="text-xs text-gray-500">Aired on: {show.air_date}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Servicepage;
