import Container from "../../components/Container/Container";
import Header from "../../components/header/Header";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loader from "../../components/Loader/Loader";
import MovieModal from "../../components/MovieModal/MovieModal";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import fetchMovie from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Pagination from "../../components/Pagination/Pagination";

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [isErrorMovies, setIsErrorMovies] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSubmit = async (query: string) => {
    setSearchQuery(query);
    await loadMovies(query, 1);
  };
  const loadMovies = async (query: string, page: number) => {
    try {
      setIsLoadingMovies(true);
      setIsErrorMovies(false);

      const response = await fetchMovie(query, page);

      if (response.results.length === 0) {
        toast("No movies found for your request.");
      }

      setMovies(response.results);
      setPageNumber(response.page);
      setTotalPages(response.total_pages);
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
  const onClearMovies = () => {
    setMovies([]);
    setSearchQuery("");
    setPageNumber(1);
    setTotalPages(0);
  };
  const handlePageChange = async (nextPage: number) => {
    if (!searchQuery || nextPage < 1 || nextPage > totalPages) {
      return;
    }

    await loadMovies(searchQuery, nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Header />
      <main>
        <Container>
          <SearchBar
            onSubmit={handleSubmit}
            movies={movies}
            onClearMovies={onClearMovies}
          />

          {isLoadingMovies && <Loader />}
          {isErrorMovies && <ErrorMessage />}
          {!isLoadingMovies && !isErrorMovies && movies.length > 0 && (
            <>
              <MovieGrid movies={movies} onSelect={onSelectMovie} />

              {totalPages > 1 && (
                <Pagination
                  pageNumber={pageNumber}
                  totalPages={totalPages}
                  handlePagePagination={handlePageChange}
                />
              )}
            </>
          )}
          {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={onCloseModal} />
          )}
          {}

          <Toaster />
        </Container>
      </main>
    </div>
  );
};

export default SearchPage;
