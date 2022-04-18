export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const tmdbEndPoint='https://api.themoviedb.org/3/movie';
const tmdbEndPointSearch='https://api.themoviedb.org/3/search/movie';
const tmdbEndPointImage='https://image.tmdb.org/t/p';
export const apiKey = "b65299b9bc36d67f043452a7dc185a25";
export const tmdbAPI={
    getMovieList: (filmType, page)=>`${tmdbEndPoint}/${filmType}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieId)=>`${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
    getMovieInfo:(movieId, infoType)=>`${tmdbEndPoint}/${movieId}/${infoType}?api_key=${apiKey}`,
    getMovieSearch:(query,page)=> `${tmdbEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    imageOriginal:(url)=>`${tmdbEndPointImage}/original/${url}`,
    imageSize500:(url)=>`${tmdbEndPointImage}/w500/${url}`,
}