import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=b65299b9bc36d67f043452a7dc185a25`,
    fetcher
  );
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((films) => {
            return (
              <SwiperSlide key={films.id}>
                <BannerItem films={films}></BannerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

function BannerItem({ films }) {
  const { title, poster_path, id } = films;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="content absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5 bg-secondary p-2 inline-block rounded-lg">
          {title}
        </h2>
        <div className="flex items-center gap-x-3 mb-8">
          {new Array(3).fill(0).map(() => (
            <span
              key={v4()}
              className="px-4 py-2 border border-white rounded-md "
            >
              Actions
            </span>
          ))}
        </div>
        <Button
          onClick={() => {
            navigate(`/movies/${id}`);
          }}
          className="w-auto"
        >
          Watch Details
        </Button>
        {/* <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
          Watch Movie
        </button> */}
      </div>
    </div>
  );
}

BannerItem.propTypes = {
  films: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default withErrorBoundary(Banner, {
  FallbackComponent: () => {
    return (
      <p className="bg-red-50 text-red-400">
        Something went wrong here. Contact me at Email:
        truonghoangdung57@gmail.com
      </p>
    );
  },
});
