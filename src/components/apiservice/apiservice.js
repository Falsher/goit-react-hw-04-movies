import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '817a09125521bca0055d8c5979b5a1ec';
export function fetchMoviePopular() {
  return axios.get(`${BASE_URL}trending/movie/week?api_key=${KEY}`);
}
export function fetchMovieList(query) {
  return axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${query}`);
}
export function fetchMovieId(moviesId) {
  return axios.get(
    `${BASE_URL}movie/${moviesId}?api_key=${KEY}&language=en-US`,
  );
}

export function fetchActorId(moviesId) {
  return axios.get(
    `${BASE_URL}movie/${moviesId}/credits?api_key=${KEY}&language=en-US`,
  );
}
export function fetchReviews(moviesId) {
  return axios.get(
    `${BASE_URL}movie/${moviesId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}
