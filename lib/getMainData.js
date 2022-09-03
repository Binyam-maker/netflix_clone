import axios from "axios";

const urlTrendingTV = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

const urlTrendingMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

async function getMainData() {
  let mainData = {};
  // Trending Movie
  try {
    const response = await axios.get(urlTrendingMovie);
    const result = response.data.results;
    mainData = { ...mainData, trendingMovie: result };
  } catch (error) {
    console.log(error);
  }

  // Trending TV
  try {
    const response = await axios.get(urlTrendingTV);
    const result = response.data.results;
    mainData = { ...mainData, trendingTV: result };
  } catch (error) {
    console.log(error);
  }
  return mainData;
}

export default getMainData;
