import { useSearchParams } from "react-router";
import {Card} from "../components"
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const [shows, setShows] = useState([]);
  

  
  useEffect(() => {
    document.title = `Search results for '${queryTerm}' / Streamline`;
  }, [queryTerm]);

  useEffect(() => {
    const fetchShows = async () => {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=35cf57aca57cb4fac072f55aca5b8bfc&query=${queryTerm}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    if (queryTerm) {
      fetchShows();
    }
  }, [queryTerm]);

 

  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">
          {shows.length === 0
            ? `No result found for '${queryTerm}'`
            : `Results for '${queryTerm}'`}
        </p>
      </section>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {shows.map((show) => (
            <div key={show.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{show.name || show.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{show.overview || "No description available"}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

}

export default Search

