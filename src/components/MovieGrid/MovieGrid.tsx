import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  const onMovieClick = (movie: Movie) => {
    onSelect(movie);
  };
  return (
    <ul className={css.grid}>
      {movies.map(
        ({
          id,
          poster_path,
          title,
          backdrop_path,
          overview,
          release_date,
          vote_average,
        }) => (
          <li
            key={id}
            onClick={() =>
              onMovieClick({
                id,
                poster_path,
                title,
                backdrop_path,
                overview,
                release_date,
                vote_average,
              })
            }
          >
            <div className={css.card}>
              <img
                className={css.image}
                src={`${import.meta.env.VITE_IMAGE_PATH}/${poster_path}`}
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
export default MovieGrid;
