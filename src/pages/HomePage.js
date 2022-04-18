import React, { Fragment } from "react";
import { withErrorBoundary } from "react-error-boundary";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>
        <MovieList filmType="now_playing" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Rated
        </h2>
        <MovieList filmType="top_rated" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <MovieList filmType="popular" />
      </section>
    </Fragment>
  );
};

export default withErrorBoundary(HomePage,{
  FallbackComponent: ()=>{
    return <p className="bg-red-50 text-red-400">Something went wrong here. Contact me at Email: truonghoangdung57@gmail.com</p>
  }
});
