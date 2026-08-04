import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

// Components
import MovieModal from "../../components/MovieModal/MovieModal";
import Container from "../../components/Container/Container";
import Header from "../../components/header/Header";
import Loader from "../../components/Loader/Loader";
import Hero from "../../components/Hero/Hero";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TopMovies from "../../components/TopMovies/TopMovies";
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";
// Types
import type {
  PopularMovie,
  Movie,
  TopRatingMovie,
  UpcomingMovie,
} from "../../types/movie";
// Services
import popularMoviesService from "../../services/popularMoviesService";
import fectchTopRatingMovies from "../../services/topRatingService";
import fetchUpcomingMovies from "../../services/upcomingServices";

const HomePage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  const [isLoadingPopularMovies, setIsLoadingPopularMovies] =
    useState<boolean>(true);
  const [errorPopularMovies, setErrorPopularMovies] = useState<boolean>(false);
  // TopMovies State
  const [topMovies, setTopMovies] = useState<TopRatingMovie[]>([]);
  const [isLoadingTopMovies, setSsLoadingTopMovies] = useState<boolean>(true);
  const [isErrorTopMovies, setIsErrorTopMovies] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // Upcoming Movies State
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [isLoadingUpcomingMovies, setIsLoadingUpcomingMovies] =
    useState<boolean>(true);
  const [isErrorUpcomingMovies, setIsErrorUpcomingMovies] =
    useState<boolean>(false);
  const [pageNumberUpcomingMovies, setPageNumberUpcomingMovies] =
    useState<number>(1);
  const [totalPagesUpcomingMovies, setTotalPagesUpcomingMovies] =
    useState<number>(0);

  // fetchPopularMovies
  useEffect(() => {
    popularMoviesService()
      .then((data) => {
        setPopularMovies(data);
        if (data.length === 0) {
          toast("No movies found for your request.");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorPopularMovies(true);
      })
      .finally(() => {
        setIsLoadingPopularMovies(false);
      });
  }, []);
  // fetchTopRatingMovies
  useEffect(() => {
    fectchTopRatingMovies(pageNumber)
      .then((data) => {
        setTopMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        setIsErrorTopMovies(true);
      })
      .finally(() => {
        setSsLoadingTopMovies(false);
      });
  }, [pageNumber]);

  useEffect(() => {
    fetchUpcomingMovies(pageNumberUpcomingMovies)
      .then((data) => {
        setUpcomingMovies(data.results);
        setTotalPagesUpcomingMovies(data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        setIsErrorUpcomingMovies(true);
      })
      .finally(() => {
        setIsLoadingUpcomingMovies(false);
      });
  }, [pageNumberUpcomingMovies]);

  const onSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onCloseModal = () => {
    setSelectedMovie(null);
  };
  const handlePagePagination = (nextPage: number) => {
    // setSsLoadingTopMovies(true);
    // setIsErrorTopMovies(false);
    setPageNumber(nextPage);
  };
  const handleUpcomingPagination = (nextPage: number) => {
    // setIsLoadingUpcomingMovies(true)
    // setIsErrorUpcomingMovies(false)
    setPageNumberUpcomingMovies(nextPage);
  };
  return (
    <div>
      <Header />
      <main>
        <Container>
          {isLoadingPopularMovies && <Loader />}
          {errorPopularMovies && <ErrorMessage />}
          {!isLoadingPopularMovies &&
            !errorPopularMovies &&
            popularMovies.length > 0 && (
              <Hero
                popularMovies={popularMovies}
                onSelectMovie={onSelectMovie}
              />
            )}
          {isLoadingTopMovies && <Loader />}
          {isErrorTopMovies && <ErrorMessage />}

          {!isLoadingTopMovies && !isErrorTopMovies && topMovies.length > 0 && (
            <TopMovies
              topMovies={topMovies}
              pageNumber={pageNumber}
              totalPages={totalPages}
              handlePagePagination={handlePagePagination}
              onSelectMovie={onSelectMovie}
            />
          )}

          {isLoadingUpcomingMovies && <Loader />}
          {isErrorUpcomingMovies && <ErrorMessage />}

          {!isLoadingUpcomingMovies &&
            !isErrorUpcomingMovies &&
            upcomingMovies.length > 0 && (
              <UpcomingMovies
                topMovies={upcomingMovies}
                pageNumber={pageNumberUpcomingMovies}
                totalPages={totalPagesUpcomingMovies}
                handlePagePagination={handleUpcomingPagination}
                onSelectMovie={onSelectMovie}
              />
            )}
        </Container>
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onCloseModal} />
      )}
      <Toaster />
    </div>
  );
};

export default HomePage;
