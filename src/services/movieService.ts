import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Movie } from "../types/movie";

export const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_SEARCH_MOVIE_URL}`,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface FetchMoviesResponse {
  page: number
  results: Movie[];
  total_pages: number
}
const fetchMovie = async (movieName: string, pageNumber: number): Promise<FetchMoviesResponse>=> {
  const response = await api.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query: `${movieName}`,
      page: pageNumber
    },
  });

  return response.data;
};
export default fetchMovie;
