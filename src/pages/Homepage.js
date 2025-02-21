import React from 'react'
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
   <main>
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Streamline</h1>
          <p  className="text-xl mb-6">Track upcoming TV shows across streaming services in one place.</p>
          <button className="bg-[#2596be] text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-[#1f7fa3] transition-colors" onClick={() => navigate("/streaming-services")}>Get Started</button>
    </section>
   </main>
  )
}

export default Homepage
