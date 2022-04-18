import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardLoadingSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ filmType = "now-playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(filmType), fetcher);
  const isLoading = !data && !error;
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      {isLoading && (
        <Fragment>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardLoadingSkeleton></MovieCardLoadingSkeleton>
            </SwiperSlide>
          </Swiper>
        </Fragment>
      )}
      {!isLoading && <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard films={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>}
    </div>
  );
};

MovieList.propTypes = {
  filmType: PropTypes.string.isRequired,
};

export default withErrorBoundary(MovieList, {
  FallbackComponent: () => {
    return (
      <p className="bg-red-50 text-red-400">
        Something went wrong here. Contact me at Email:
        truonghoangdung57@gmail.com
      </p>
    );
  },
});
