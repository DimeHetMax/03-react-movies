import Pagination from "../Pagination/Pagination";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { UpcomingMovie, Movie } from "../../types/movie";
import styles from "./UpcomingMovies.module.css";

interface UpcomingMoviesProps {
  topMovies: UpcomingMovie[];
  pageNumber: number;
  totalPages: number;
  handlePagePagination: (pageNumber: number) => void;
  onSelectMovie: (movie: Movie) => void;
}
const UpcomingMovies = ({
  topMovies,
  pageNumber,
  totalPages,
  handlePagePagination,
  onSelectMovie,
}: UpcomingMoviesProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Upcoming Movies</h2>
      <MovieGrid movies={topMovies} onSelect={onSelectMovie} />
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        handlePagePagination={handlePagePagination}
      />
    </section>
  );
};
export default UpcomingMovies;
