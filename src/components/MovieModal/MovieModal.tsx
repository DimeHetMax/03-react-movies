import { useEffect, type MouseEvent } from "react";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
interface MovieModalProp {
  movie: Movie;
  onClose: () => void;
}
const MovieModal = ({ movie, onClose }: MovieModalProp) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);
  
 const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
  if (event.target === event.currentTarget) {
    onClose();
  }
};
  const { title, backdrop_path, overview, release_date, vote_average } = movie;
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`${import.meta.env.VITE_IMAGE_PATH_ORIGINAL}/${backdrop_path}`}
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
