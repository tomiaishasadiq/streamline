import React, {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import {UseTitle} from "../UseTitle";
import {Card} from "../components"
import streamingServices from '../data/streamingServices';
import networkMappings from './../data/networkMappings';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Streamingpage = ({title}) => {
  const [services, setServices] = useState(streamingServices);
  const navigate = useNavigate();
    //eslint-disable-next-line
    const pageTitle = UseTitle(title);

  useEffect(() => {
    const fetchNetworkImage = async () => {
      const updatedServices = await Promise.all(
        services.map(async (service) => {
          const networkId = networkMappings[service.id];
          if (networkId) {
            try {
              const res = await fetch(`${BASE_URL}/network/${networkId}/images?api_key=${API_KEY}`);
              const data = await res.json();
              const imgSrc = `https://image.tmdb.org/t/p/original${data.logos[6]?.file_path || data.logos[3]?.file_path || data.logos[2]?.file_path ||data.logos[0]?.file_path || data.logos[1]?.file_path}`; 
              return { ...service, imgSrc };
            } catch (error) {
              console.error(`Error fetching image for ${service.name}:`, error);
              return { ...service, imgSrc: '' };
            }
          }
          return service;
        })
      );
      setServices(updatedServices);
    };
    fetchNetworkImage();
  }, [services])



  return (
   
    <main>
      <section className="max-w-7xl mx-auto py-7 ">
          <h2 className="text-text text-center text-2xl text-black-900 font-bold mb-5">Select a Streaming Service</h2>
          <div className="flex justify-center  flex-wrap" >
              {services.map((service) => (
              <Card
                key={service.id}
                service = {service}
                onClick={() => navigate(`/service/${service.id}`)}
             />               
              ))}
            </div>
      </section>
    </main>
  )
}

export default Streamingpage
