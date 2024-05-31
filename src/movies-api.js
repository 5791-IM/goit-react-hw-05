import axios from "axios";

const API_KEY = "e0143e755b939d3bba068a5d4d88bc60";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDE0M2U3NTViOTM5ZDNiYmEwNjhhNWQ0ZDg4YmM2MCIsInN1YiI6IjY2MjI0Njc5ZTY0MGQ2MDE4NmM0NzdiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nLkKPo3_d4gofkcDr5vstbSGg2LD78N56KTkf0aSRDk";
const BASE_URL = "https://api.themoviedb.org/3";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
// axios.defaults.params = {
//   api_key: API_KEY,
// };

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      query,
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(`/movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export default {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};
