import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import Button from "../Button/Button";

interface SearchBarProps {
  movies: Movie[];
  onClearMovies: () => void;
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit, movies, onClearMovies }: SearchBarProps) => {
  const handleForm = (formData: FormData) => {
    const query = String(formData.get("query") ?? "").trim() as string;

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query);
  };
  return (
    <header className={styles.header}>
      {" "}
      <div className={styles.container}>
        <form className={styles.form} action={handleForm}>
          {" "}
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />{" "}
          <button className={styles.button} type="submit">
            Search{" "}
          </button>{" "}
        </form>{" "}
        {movies.length>0 && (
          <Button
            buttonText="Clear Search"
            buttonType="button"
            handleButton={onClearMovies}
          />
        )}
      </div>
      <Toaster />
    </header>
  );
};

export default SearchBar;
