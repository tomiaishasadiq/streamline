import React from 'react';
import {  Link } from "react-router-dom";
import Img from "../assets/logo.png";

const Card = ({service,onClick}) => {
  return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm m-3" onClick = {onClick}>
        <Link to="#">
            <img className="rounded-t-lg" src={service.imgSrc} alt={service.name} />
        </Link>
        <div className="p-5">
            <Link to="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{service.name}</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.description}</p>
           
        </div>
    </div>

  )
}

export default Card
