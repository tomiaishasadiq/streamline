import React from 'react';
import { useNavigate} from "react-router-dom";
import {Card} from "../components"
import Img from "../assets/logo.png";

const Streamingpage = () => {
  const streamingServices = [
    { 
      name: "Hulu", 
      id: "hulu", 
      imgSrc: Img, 
      description: "Stream your favorite TV shows and movies"
    },
    { 
      name: "Netflix", 
      id: "netflix", 
      imgSrc: Img,
      description: "Watch original content and top shows"
    },
    { 
      name: "Prime Video", 
      id: "prime", 
      imgSrc: Img, 
      description: "Enjoy exclusive movies and TV shows"
    },
    { 
      name: "Apple TV+", 
      id: "appletv", 
      imgSrc: Img, 
      description: "Apple's original content library"
    },
    { 
      name: "Sky TV+", 
      id: "skytv", 
      imgSrc: Img, 
      description: ""
    },
    { 
      name: "Disney+", 
      id: "disney", 
      imgSrc: Img,
      description: "Stream Disney, Marvel, and Pixar"
    },
    { 
      name: "HBO Max", 
      id: "hbomax", 
      imgSrc: Img,
      description: "HBO's premium shows and movies"
    },
    { 
      name: "Paramount", 
      id: "paramount", 
      imgSrc: Img,
      description: "Stream CBS, Showtime, and more"
    },
    { 
      name: "Starz", 
      id: "starz", 
      imgSrc: Img,
      description: "Stream CBS, Showtime, and more"
    }
    ,  { 
      name: "Peacock", 
      id: "peacock", 
      imgSrc: Img,
      description: "Stream CBS, Showtime, and more"
    }
  ];
  const navigate = useNavigate();

  return (
   
    <main>
      <section className="max-w-7xl mx-auto py-7">
          <h2 className="text-center mb-5">Choose a Streaming Service</h2>
          <div className="flex justify-start flex-wrap" >
              {streamingServices.map((service) => (
              <Card
                key={service.id}
                service = {service}
                onClick={() => navigate(`/service/${service.id}`)}/>               
              ))}
            </div>
      </section>
    </main>
  )
}

export default Streamingpage
