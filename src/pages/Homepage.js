import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUpcomingShows } from "../tmdb";
import networkMappings from './../data/networkMappings';
import {UseTitle} from "../UseTitle";
import '../index.css'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Homepage = ({title}) => {
  const navigate = useNavigate();
  const pageTitle = UseTitle(title);
  const [featuredShows, setFeaturedShows] = useState([]);
  const networks = ['Hulu', 'Netflix', 'Appletv', 'Primevideo', 'Disneyplus', 'Hbomax', 'Max', 'Paramount'];


  useEffect(() => {
    const loadFeaturedShows = async () => {
      try {
        let allShows = [];
        
       
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
    <main className="p-8">
       <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-10  2xl:mt-64 2xl:gap-32"> 
  
        <section className="w-1/2 flex flex-col items-start">
          <h1 className="text-text text-3xl sm:text-5xl md:text-6xl font-bold mt-2 sm:mt-4 mb-4 whitespace-nowrap">Welcome to Streamline</h1>
          <p className="font-body text-text text-lg sm:text-xl md:text-xl mb-10 text-justify ">
          Stay updated on new and returning TV shows across streaming platforms and networks, all in one place.
          </p>
          <div className="w-full flex justify-center">
          <button
            className="bg-accent text-white text-2xl sm:text-3xl md:text5xl  font-bold mt-2 md:mt-8 py-4 px-8 rounded-lg shadow-lg hover:bg-secondary hover:shadow-2xl transition-all"
            onClick={() => navigate("/streaming-services")}
          >
            Get Started
          </button>
        </div>
        </section>
  
  
        <div className="w-full sm:w-3/4 lg:w-1/2  bg-primary p-4 rounded-lg">
          {showChunks.length > 0 ? (
            <Swiper
            style={{
              "--swiper-pagination-color": "#553c9a", 
              "--swiper-pagination-bottom": "-4px",
              "--swiper-navigation-color": "#553c9a", 
            }}
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
      </div>
    </main>
  ); 
  
  
};

export default Homepage;
