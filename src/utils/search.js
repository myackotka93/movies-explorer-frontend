import { DURATION } from "./constans"

export function searchMovies(keyValue = '', movies = []) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(keyValue.toLowerCase())
  })
}

export function searchMoviesByDuration(movies) {
  return movies.filter((movie) => {
    return movie.duration <= DURATION
  })
}

export function handleSearch(keyValue, movies, isDuration, moviesHandler) {
  if (isDuration) {
    moviesHandler(searchMoviesByDuration(keyValue, movies))
  } else {
    moviesHandler(searchMovies(keyValue, movies))
  }
}