import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import styles from "./Hero.module.css";

import type { PopularMovie, Movie } from "../../types/movie";
interface HeroProps {
  popularMovies: PopularMovie[];
  onSelectMovie: (movie: Movie) => void;
}

const Hero = ({ popularMovies, onSelectMovie }: HeroProps) => {

  return (
    <section className={styles.hero} aria-label="Popular movies">
      <Swiper
        loop
        speed={2000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className={styles.swiper}
      >
        {popularMovies.map(
          ({
            id,
            poster_path,
            backdrop_path,
            title,
            overview,
            release_date,
            vote_average,
          }) => (
            <SwiperSlide key={id}>
              <div
                className={styles.slide}
                onClick={() =>
                  onSelectMovie({
                    id,
                    poster_path,
                    backdrop_path,
                    title,
                    overview,
                    release_date,
                    vote_average,
                  })
                }
              >
                <img
                  className={styles.image}
                  src={`${import.meta.env.VITE_IMAGE_PATH_ORIGINAL}/${backdrop_path}`}
                  alt={title}
                />
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </section>
  );
};

export default Hero;
