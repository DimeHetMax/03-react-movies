import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchMovie from "../../services/movieService";
import type { Movie } from "../../types/movie";
import "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [isErrorMovies, setIsErrorMovies] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSubmit = async (query: string) => {
    try {
      setIsLoadingMovies(true);
      setIsErrorMovies(false);
      const response = await fetchMovie(query);
      if (response.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(response);
    } catch (error) {
      console.log(error);
      setIsErrorMovies(true);
    } finally {
      setIsLoadingMovies(false);
    }
  };
  const onSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onCloseModal = () => {
    setSelectedMovie(null);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoadingMovies && <Loader />}
      {isErrorMovies && <ErrorMessage />}
      {!isLoadingMovies && !isErrorMovies && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={onSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onCloseModal} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
