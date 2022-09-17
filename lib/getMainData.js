import axios from "axios";

const urlTrendingTV = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

const urlTrendingMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

const urlKidsMovies = `https://api.themoviedb.org/3/discover/movie?api_key=1f5551cada1a3a631267a5841ebe5203&language=en-US&sort_by=vote_count.desc&certification_country=US&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=flatrate`;

const urlOriginals = `https://api.themoviedb.org/3/tv/popular?api_key=1f5551cada1a3a631267a5841ebe5203&language=en-US&page=1`;

async function getMainData() {
  let mainData = {};
  // Trending Movie
  try {
    const response = await axios.get(urlTrendingMovie);
    const result = response.data.results;
    mainData = { ...mainData, trendingMovie: result };
  } catch (error) {
    console.error(error);
    mainData = { ...mainData, trendingMovie: [] };
  }

  // Trending TV
  try {
    const response = await axios.get(urlTrendingTV);
    const result = response.data.results;
    mainData = { ...mainData, trendingTV: result };
  } catch (error) {
    console.error(error);
    mainData = { ...mainData, trendingTV: [] };
  }
  // Top kids movie
  try {
    const response = await axios.get(urlKidsMovies);
    const result = response.data.results;
    mainData = { ...mainData, topKids: result };
  } catch (error) {
    console.error(error);
    mainData = { ...mainData, topKids: [] };
  }
  // Originals
  try {
    const response = await axios.get(urlOriginals);
    const result = response.data.results;
    mainData = { ...mainData, originals: result.reverse() };
  } catch (error) {
    console.error(error);
    mainData = { ...mainData, originals: [] };
  }
  return mainData;
}

export default getMainData;
