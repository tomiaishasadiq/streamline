import {Routes, Route} from "react-router-dom";
import {Homepage, Servicepage,Streamingpage} from "../pages";

import React from 'react'

const AllRoutes = () => {
  return (
    <main>
    <Routes>
        <Route path= "/" element = {<Homepage title="Home" />}/>
        <Route path="/streaming-services" element={<Streamingpage title="Streaming services" />} />
        <Route path="/service/:serviceId" element={<Servicepage title="Tvshows" />} />
    </Routes>
    </main>
  )
}

export default AllRoutes
