import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes, { number, string } from "prop-types";
// import { v4 } from "uuid";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-6">
      <div className="w-full h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10 ">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl shadow-[-20px_-15px_60px_1px_rgba(0,0,0,1)]"
        />
      </div>
      <h1 className="text-center text-3xl text-white font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => {
            return (
              <span
                className="px-4 py-2 border border-primary text-primary rounded"
                key={item.id}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <GetMovieType type="credits"></GetMovieType>
      <GetMovieType type="videos"></GetMovieType>
      <MovieReviews></MovieReviews>
      <GetMovieType type="similar"></GetMovieType>
      {/* <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar> */}
    </div>
  );
};

// 3 component after refacting codes:

function GetMovieType({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-2xl mb-10">Main Casts</h2>
        <div className="grid grid-cols-5 gap-4">
          {cast.slice(0, 5).map((item) => {
            return (
              <div key={item.id} className="cast-item">
                <img
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  alt="cast_img"
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl font-medium text-center">{item.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => {
              return (
                <div key={item.id}>
                  <h3 className="mb-6 text-xl font-medium text-secondary text-center">
                    <span className="text-primary bg-white inline-block rounded-lg p-2">
                      Trailer
                    </span>{" "}
                    {item.name}
                  </h3>{" "}
                  <div className="w-[70vw] aspect-video m-auto mb-2">
                    <iframe
                      width="636"
                      height="358"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-fill rounded-lg"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieCard films={item} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

// 3 component before refacting codes:
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl mb-10">Main Casts</h2>
      <div className="grid grid-cols-5 gap-4">
        {cast.slice(0, 5).map((item) => {
          return (
            <div key={item.id} className="cast-item">
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt="cast_img"
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "videos"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => {
          return (
            <div key={item.id}>
              <h3 className="mb-6 text-xl font-medium text-secondary text-center">
                <span className="text-primary bg-white inline-block rounded-lg p-2">
                  Trailer
                </span>{" "}
                {item.name}
              </h3>{" "}
              <div className="w-[70vw] aspect-video m-auto mb-2">
                <iframe
                  width="636"
                  height="358"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-fill rounded-lg"
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard films={item} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

function MovieReviews() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "reviews"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Movie Reviews</h2>
      <div className="movie-reviews">
        {results.slice(0, 5).map((item) => {
        
          return (
            <div key={item.id} className="detail-reviews ">
              <div className="flex flex-col mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="reviews-avatar w-14 h-14">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={item.author_details?.avatar_path?.slice(1)}
                      alt="avatar"
                    />
                  </div>
                  <div className="reviews-author">
                    {" "}
                    <h2 className="bg-primary inline-block p-1 rounded-lg">
                      {item.author}
                    </h2>
                  </div>
                </div>
                <div className="reviews-comments">
                  <p className="text-ellipsis overflow-hidden w-[70vw] line-clamp-2">
                    {item.content}
                  </p>
                </div>
                <span className="text-secondary text-sm">
                  {new Date(item.updated_at).toUTCString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

GetMovieType.propTypes = {
  type: PropTypes.string,
};
MovieReviews.propTypes = {
  results: PropTypes.shape({
    id: number,
    author_details: string,
    author_path: string,
    author: string,
    content: string,
    updated_at: string,
  }),
};

export default withErrorBoundary(MovieDetailsPage, {
  FallbackComponent: () => {
    return (
      <p className="bg-red-50 text-red-400">
        Something went wrong here. Contact me at Email:
        truonghoangdung57@gmail.com
      </p>
    );
  },
});
