import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import networkMappings from './../data/networkMappings';
import Img from "../assets/logo.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Servicepage = () => {
  const { serviceId } = useParams(); 
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    async function fetchUpcomingShows() {
      const networkId = networkMappings[serviceId]; //network ID
      if (!networkId) return;

      let allShows = [];
      let page = 1;
      const currentDate = new Date().toISOString().split('T')[0]; //date format 'YYYY-MM-DD'

      try {
        while (true) {
          const response = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${networkId}&air_date.gte=${currentDate}&page=${page}`
          );
          const data = await response.json();
          const showResults = data.results;
          
         
        const detailedShows = await Promise.all(
          showResults.map(async (show) => {
            const showDetailsResponse = await fetch(
              `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}`
            );
            const showDetails = await showDetailsResponse.json();

            return {
              ...show,
              nextEpisode: showDetails.next_episode_to_air || null, 
              status: showDetails.status
            };
          })
        );
          
          allShows = [...allShows, ...detailedShows];

          // If there are no more pages, stop fetching
          if (data.page >= data.total_pages) {
            break;
          }

          page++;
        }
          // Apply filter after fetching the shows
          if (filter === 'new') {
            allShows = allShows.filter((show) => show.status === "In Production");
          } else if (filter === 'returning') {
            allShows = allShows.filter((show) => show.status === "Returning Series");
          }

        setShows(allShows); 
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingShows();
  }, [serviceId, filter]);

  return (
    <main className="max-w-7xl mx-auto py-7">
      <h2 className="text-center text-2xl text-black-900 font-bold mb-5">Upcoming TV Shows on {serviceId}</h2>

      <FormControl fullWidth  sx={{ marginBottom: 8 }} >
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All TV Shows</MenuItem>
            <MenuItem value="new">New TV Shows</MenuItem>
            <MenuItem value="returning">Returning TV Shows</MenuItem>
          </Select>
        </FormControl>

      {loading ? (
        <p className="text-center">
          <img src= {Img} alt="Loading" className="mx-auto" />
          Loading...</p>
      ) : shows.length === 0 ? (
        <p className="text-center">No Upcoming TV shows.</p>
      ) : (
        <div className="space-y-5">
          {shows.map((show) => (
            <div
              key={show.id}
              className="flex items-center max-w-7xl mx-auto h-80 bg-white rounded-lg shadow-md p-4"
            >
             
              <div className="w-40 h-56 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
              {show.poster_path ? (
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white text-sm font-bold">
                      {show.name}
                    </div>
                  )}
                </div>
              <div className="flex-1 flex-col justify-between ml-6">
                <h3 className="text-xl font-bold">{show.name}</h3>
                <p className="text-lg text-black-500 font-bold">{`Overview: ${show.overview}`}</p>
                {show.nextEpisode && (
                  <p className="text-lg mt-6 text-gray-500 font-bold">
                    Next Episode:<br/> {show.nextEpisode.name} - Airs on {show.nextEpisode.air_date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Servicepage;
