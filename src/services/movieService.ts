import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Movie } from "../types/movie";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_SEARCH_MOVIE_URL}`,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface FetchMoviesResponse {
  results: Movie[];
}
const fetchMovie = async (movieName: string): Promise<Movie[]>=> {
  const response = await api.get<FetchMoviesResponse>("", {
    params: {
      query: `${movieName}`,
    },
  });
  return response.data.results;
};
export default fetchMovie;
