import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, {
  MovieCardLoadingSkeleton,
} from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { withErrorBoundary } from "react-error-boundary";
import {v4} from 'uuid'

// const pageNumber = 5;
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  console.log(data);
  return (
    <div className="py-10 page-container ">
      <div className="flex mb-10 gap-3 w-[40vw] m-auto">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none rounded-lg"
            placeholder="Find your movie here..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {/* --------Loading by spin circle-------- */}
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}

      {/* --------Loading by skeleton-------- */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
        {new Array(itemsPerPage).fill(0).map(()=>(
          <MovieCardLoadingSkeleton key={v4()}></MovieCardLoadingSkeleton>
        ))}     
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => {
            return <MovieCard key={item.id} films={item}></MovieCard>;
          })}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
      {/* <div className="flex items-center justify-center mt-10 gap-x-5 hidden">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => setNextPage(nextPage - 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        {new Array(pageNumber).fill(0).map((item, index) => {
          return (
            <span
              // key={index}
              className="cursor-pointer inline-block p-3 bg-white text-slate-900 leading-none py-2 px-3 rounded"
              onClick={() => setNextPage(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}

        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => setNextPage(nextPage + 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default withErrorBoundary(MoviePage, {
  FallbackComponent: () => {
    return (
      <p className="bg-red-50 text-red-400">
        Something went wrong here. Contact me at Email:
        truonghoangdung57@gmail.com
      </p>
    );
  },
});
