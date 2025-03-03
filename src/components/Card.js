import React from 'react';
import Img from "../assets/logo.png"

const Card = ({service,onClick}) => {
  return (
        <div className="max-w-sm h-72 w-96 bg-primary border border-gray-200 rounded-lg shadow-sm m-3 hover:bg-secondary transition-colors" onClick = {onClick}>
        
        <img className="mx-auto mt-4 mb-2 h-32 w-64 object-contain " src={service.imgSrc || Img} alt={service.name}  />
        
        
        <div className="p-5">
            <h5 className="text-text mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{service.name}</h5>
            <p className="mb-3 text-text text-black-700 font-bold">{service.description}</p>
        </div>
    </div>

  )
}

export default Card
