import { api } from "./movieService";
import type { TopRatingMovie } from "../types/movie";
interface FetchTopRatingMoviesResponse {
  page: number;
  results: TopRatingMovie[];
  total_pages: number;
}
const fectchTopRatingMovies = async (
  pageNumber: number,
): Promise<FetchTopRatingMoviesResponse> => {
  const response = await api.get<FetchTopRatingMoviesResponse>("/movie/top_rated", {
    params: {
      language: "en-US",
      page: pageNumber,
    },
  });
//   console.log("fectchTopRatingMovies=>>>", response.data);
  return response.data;
};

export default fectchTopRatingMovies;
// /movie/top_rated
