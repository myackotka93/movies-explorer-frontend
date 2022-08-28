import React, { useCallback, useContext, useEffect, useState } from "react";
import * as moviesApi from "../utils/MoviesApi.js";
import * as mainApi from "../utils/MainApi.js";
import { searchMovies, searchMoviesByDuration } from "../utils/search.js";
import { useUser } from "./User.js";

const MoviesContext = React.createContext({});

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const { user } = useUser();
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMovies = useCallback((form = {}) => {
    setIsMovieLoading(true);
    setIsError(false);

    const localMovies = JSON.parse(localStorage.getItem('movies') ?? '[]'); 

    if (localMovies.length) {      
      const filteredMovies = filterMovies(localMovies, form);
      setMovies(filteredMovies)
      setIsMovieLoading(false);

      return;
    }
    
    moviesApi.getFilms()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        const filteredMovies = filterMovies(movies, form);
        setMovies(filteredMovies)
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsMovieLoading(false);
      });
  }, [])

  function filterMovies(movies, form) {
    const searchableMovies = searchMovies(form.search, movies);
    return form.filter ? searchMoviesByDuration(searchableMovies) : searchableMovies;
  }

  const getSavedMovies = useCallback((form = {}) => {
    setIsMovieLoading(true);
    setIsError(false);

    mainApi.getSavedFilms()
      .then((res) => {
        const filteredMovies = filterMovies(res, form);
        setSavedMovies(filteredMovies);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsMovieLoading(false);
      });
  }, []);

  useEffect(() => {
    getSavedMovies();
  }, [getSavedMovies]);


  function toggleSaveMovie(movie, form = {}) {
    setIsError(false);

    const id = movie.id || movie.movieId;
    const savedMovie = savedMovies.find(item => item.movieId === id && item.owner === user._id);
    const isLiked = !!savedMovie;

    mainApi.changeSaveMovieStatus(savedMovie ?? movie, isLiked)
      .then((newMovie) => {
        setSavedMovies((films) => {
          let newFilms = [...films];
          if (savedMovie) {
            newFilms = newFilms.filter(film => film.movieId !== savedMovie.movieId)
          } else {
            newFilms.push(newMovie);
          }

          const filteredMovies = filterMovies(newFilms, form);
          return filteredMovies;
        });
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  return (
    <MoviesContext.Provider value={{ movies, getMovies, savedMovies, getSavedMovies, toggleSaveMovie, isMovieLoading, isError }}>
      {children}
    </MoviesContext.Provider>
  )
}


export function useMovies() {
  return useContext(MoviesContext)
}

export default MoviesProvider;

