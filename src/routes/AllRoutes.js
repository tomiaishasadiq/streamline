import {Routes, Route} from "react-router-dom";
import {Homepage, Servicepage,Streamingpage, Search } from "../pages";

import React from 'react'

const AllRoutes = () => {
  return (
    <main>
    <Routes>
        <Route path= "/" element = {<Homepage/>}/>
        <Route path="/streaming-services" element={<Streamingpage />} />
        <Route path="/service/:serviceId" element={<Servicepage />} />
        <Route path="/search" element={<Search/>} />
    </Routes>
    </main>
  )
}

export default AllRoutes
