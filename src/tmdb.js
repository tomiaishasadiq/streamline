const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchUpcomingShows = async (networkId) => {
  if (!networkId) return [];

  let allShows = [];
  let page = 1;
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    while (true) {
      const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${networkId}&air_date.gte=${currentDate}&page=${page}`
      );
      const data = await response.json();
      const showResults = data.results;

      const detailedShows = await Promise.all(
        showResults.map(async (show) => {
          const showDetailsResponse = await fetch(
            `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}`
          );
          const showDetails = await showDetailsResponse.json();

          
          const externalIdsResponse = await fetch(
            `${BASE_URL}/tv/${show.id}/external_ids?api_key=${API_KEY}`
          );
          const externalIds = await externalIdsResponse.json();

          return {
            ...show,
            backdrop_path: showDetails.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${showDetails.backdrop_path}` 
            : null, 
            overview: showDetails.overview || 'No description available.', 
            nextEpisode: showDetails.next_episode_to_air || null,
            lastAirDate: showDetails.last_air_date || null,
            numberOfSeasons: showDetails.number_of_seasons || 0,
            status: showDetails.status,
            inProduction: showDetails.in_production,
            imdbUrl: externalIds.imdb_id
            ? `https://www.imdb.com/title/${externalIds.imdb_id}`
            : null,  
        };
        })
      );

      allShows = [...allShows, ...detailedShows];

      if (data.page >= data.total_pages) {
        break;
      }
      page++;
    }
    return allShows;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};
