import { api } from "./movieService";
import type { UpcomingMovie } from "../types/movie";

interface FetchUpcomingMoviesResponse {
  page: number;
  total_pages: number;
  results: UpcomingMovie[];
}
const fetchUpcomingMovies = async (
  pageNumber: number,
): Promise<FetchUpcomingMoviesResponse> => {
  const response = await api.get<FetchUpcomingMoviesResponse>(
    "/movie/upcoming",
    {
      params: {
        language:"en-US",
        page: pageNumber,
      },
    },
  );
  return response.data;
};
export default fetchUpcomingMovies;
