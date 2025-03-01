import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import networkMappings from './../data/networkMappings';
import { fetchUpcomingShows } from "../tmdb";
import Img from "../assets/logo.png";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Servicepage = () => {
  const { serviceId } = useParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      const networkId = networkMappings[serviceId];
      const allShows = await fetchUpcomingShows(networkId);

     
      // const filteredShows = allShows.filter((show) => {
      //   if (filter === 'new') return show.status === "In Production";
      //   if (filter === 'returning') return show.status === "Returning Series";
      //   return true;
      // });
      // const filteredShows = allShows.filter((show) => {
      //   if (filter === 'new') {
      //     return show.numberOfSeasons === 1 && !show.lastAirDate;
      //   }
      //   if (filter === 'returning') {
      //     return show.inProduction && show.nextEpisode !== null;
      //   }
      //   return true; // 'all' filter
      // });

      const filteredShows = allShows.filter((show) => {
        if (filter === 'new') {
          return show.numberOfSeasons === 1 && !show.lastAirDate;
        }
        if (filter === 'returning') {
          return show.inProduction && show.nextEpisode !== null && show.lastAirDate !== null;
        }
        return true; // 'all' filter
      });
      
      

      setShows(filteredShows);
      setLoading(false);
    };

    loadShows();
  }, [serviceId, filter]);

  const handleShowClick = (imdbUrl) => {
    if (imdbUrl) {
      window.open(imdbUrl, '_blank'); // Opens the IMDb page in a new tab
    } else {
      alert("IMDb page not available for this show.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-7">
      <h2 className="text-center text-2xl text-black-900 font-bold mb-5">
        Upcoming TV Shows on {serviceId}
      </h2>

      <FormControl fullWidth sx={{ marginBottom: 8 }}>
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
          <img src={Img} alt="Loading" className="mx-auto" />
          Loading...
        </p>
      ) : shows.length === 0 ? (
        <p className="text-center">No Upcoming TV shows.</p>
      ) : (
        <div className="space-y-5">
          {shows.map((show) => (
            <div
              key={show.id}
              className="flex items-center max-w-7xl mx-auto h-80 bg-white rounded-lg shadow-md p-4"
              onClick={() => handleShowClick(show.imdbUrl)} // Handle click for IMDb URL
              style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
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
                <p className="text-lg text-black-500 font-bold">{show.overview}</p>
                {show.nextEpisode && (
                  <p className="text-lg mt-6 text-gray-500 font-bold">
                    Next Episode:<br /> {show.nextEpisode.name} - Airs on {show.nextEpisode.air_date}
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
