import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUpcomingShows } from "../tmdb";
import networkMappings from './../data/networkMappings';
import '../index.css'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Homepage = () => {
  const navigate = useNavigate();
  const [featuredShows, setFeaturedShows] = useState([]);
  const networks = ['hulu', 'netflix', 'apple', 'prime', 'disney', 'hbomax', 'max', 'paramount'];

  useEffect(() => {
    const loadFeaturedShows = async () => {
      try {
        let allShows = [];
        
        // Fetch 3 shows per network
        for (const network of networks) {
          const networkId = networkMappings[network];
          if (networkId) {
            const shows = await fetchUpcomingShows(networkId);
            allShows = [...allShows, ...shows.slice(0, 3)];
          }
        }
        
        setFeaturedShows(allShows);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    loadFeaturedShows();
  }, []);

  // Chunk shows into groups
  const chunkArray = (array, size) => {
    const filteredArray = array.filter(item => item.poster_path);
    let chunks = [];
    for (let i = 0; i < filteredArray.length; i += size) {
      chunks.push(filteredArray.slice(i, i + size));
    }
    return chunks;
  };

  const showChunks = chunkArray(featuredShows, 3);

  return (
    <main>
      <div className="bg-primary p-4 rounded-lg">
        {showChunks.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ 
              delay: 3000, 
              disableOnInteraction: false 
            }}
            
          >
            {showChunks.map((chunk, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center gap-6">
                  {chunk.map((show) => (
                    <div key={show.id} className="w-60">
                      <img
                        className="w-full h-90 object-cover rounded-lg shadow-lg"
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.name}
                      />
                      <h3 className="text-text text-xl font-bold mt-3 text-center">
                        {show.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center p-6">
            <h2 className="text-text text-2xl font-bold">No upcoming shows found.</h2>
          </div>
        )}
      </div>

      <section className="flex flex-col items-center justify-center mt-28">
        <h1 className="text-text text-5xl font-bold mb-4">Welcome to Streamline</h1>
        <p className=" text-text text-xl mb-6">
          Track upcoming TV shows across streaming services and tv networks in one place.
        </p>
        <button
          className="bg-accent text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-secondary transition-colors"
          onClick={() => navigate("/streaming-services")}
        >
          Get Started
        </button>
      </section>
    </main>
  );
};

export default Homepage;
