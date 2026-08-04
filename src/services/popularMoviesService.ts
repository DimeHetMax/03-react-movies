import { api } from "./movieService";
import type{ PopularMovie } from "../types/movie";
interface FetchPopularMoviesResponse {
  results: PopularMovie[];
}
const popularMoviesService = async ():Promise<PopularMovie[]>=> {
  const response = await api.get<FetchPopularMoviesResponse>("/movie/popular");
  return response.data.results;
};
export default popularMoviesService;
