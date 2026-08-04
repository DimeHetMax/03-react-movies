import { NavLink } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a
          className={styles.logo}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logoMark} aria-hidden="true">
            ▶
          </span>
          <span>
            <span className={styles.logoCaption}>Powered by</span>
            <span className={styles.logoName}>TMDB</span>
          </span>
        </a>
        <ul className={styles.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to="/about"
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
