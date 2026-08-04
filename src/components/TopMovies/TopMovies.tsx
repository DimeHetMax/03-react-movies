import Pagination from "../Pagination/Pagination";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { TopRatingMovie, Movie } from "../../types/movie";
import styles from "./TopMovies.module.css";

interface TopMoviesProps {
  topMovies: TopRatingMovie[];
  pageNumber: number;
  totalPages: number;
  handlePagePagination: (pageNumber: number) => void;
  onSelectMovie: (movie: Movie) => void;
}

const TopMovies = ({
  topMovies,
  pageNumber,
  totalPages,
  handlePagePagination,
  onSelectMovie,
}: TopMoviesProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Top Movies</h2>

      <MovieGrid movies={topMovies} onSelect={onSelectMovie} />
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        handlePagePagination={handlePagePagination}
      />
    </section>
  );
};
export default TopMovies;
