import React, { useContext, useState } from "react";
import * as moviesApi from "../utils/MoviesApi.js";

const MoviesContext = React.createContext({});

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies') ?? '[]'));

  function getMovies() {
    if (!movies.length) {
      moviesApi.getFilms()
        .then(initMovies)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function initMovies(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
    setMovies(movies)
  }

  return (
    <MoviesContext.Provider value={{ movies, getMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}


export function useMovies() {
  return useContext(MoviesContext)
}

export default MoviesProvider;

