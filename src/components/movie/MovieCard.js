import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../../loading/LoadingSkeleton";

const MovieCard = ({ films }) => {
  const { title, vote_average, release_date, poster_path, id } = films;
  const navigate = useNavigate();
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white flex flex-col select-none h-full">
      <img
        src={tmdbAPI.imageSize500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span className="flex items-center justify-center gap-1">
            {vote_average}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="yellow"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)}>Watch Details</Button>
        {/* <button onClick={()=> navigate(`/movies/${id}`)} className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto">Watch Details</button> */}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  films: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent: () => {
    return (
      <p className="bg-red-50 text-red-400">
        Something went wrong here. Contact me at Email:
        truonghoangdung57@gmail.com
      </p>
    );
  },
});

export const MovieCardLoadingSkeleton = () => {
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white flex flex-col select-none h-full">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3>
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
        ></LoadingSkeleton>
        {/* <button onClick={()=> navigate(`/movies/${id}`)} className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto">Watch Details</button> */}
      </div>
    </div>
  );
};
