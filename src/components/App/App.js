import "./App.css";
import { Main } from "../Main/Main";
import Movies from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import React, { useEffect, useMemo, useState } from "react";
import * as mainApi from "../../utils/MainApi.js";
import * as moviesApi from "../../utils/MoviesApi.js";
import * as search from "../../utils/search.js";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import MoviesProvider from "../../services/Movies";
import { useUser } from "../../services/User";
import { Preloader } from "../Preloader/Preloader";

function App(props) {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenFooter, setIsHiddenFooter] = useState(true);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [loadedFilms, setLoadedFilms] = React.useState(0);
  const [isNotFoundMovies, setIsNotFoundMovies] = React.useState(false);
  const [isServerMoviesError, setIsServerMoviesError] = React.useState(false);
  const [isComponentSavedMovies, setIsComponentSavedMovies] = React.useState(false);
  const navigate = useNavigate();
  const { user, setuser, isAuthCkecked } = useUser();


  function handleLink(boolean) {
    setIsAuth(boolean);
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('keyValueSavedMovies');
    localStorage.removeItem('keyValueMovies');
    setIsAuth(false);
    setMovies([])
    setSavedMovies([])

    navigate('/');
  }

  function getFilms() {
    const movies = JSON.parse(localStorage.getItem('movies') ?? '[]');

    if (movies.length) {
      initMovies(movies);
    } else {
      setIsPreloader(true);
      // setIsFormDisabled(true);
      setIsNotFoundMovies(false);

      moviesApi.getFilms()
        .then(initMovies)
        .catch((err) => {
          console.log(err);
          setIsServerMoviesError(true)
          // setIsFormDisabled(false)
        });
    }
  }

  function initMovies(movies) {
    setMovies(movies);
    setIsPreloader(false);
    setIsServerMoviesError(false)
    // setIsFormDisabled(false)
    localStorage.setItem('movies', JSON.stringify(movies));

    if (movies.length === 0) {
      setIsNotFoundMovies(true);
    }
  }

  function getSavedFilms() {
    mainApi.getSavedFilms()
      .then((res) => {
        setSavedMovies(res)
      })
      .catch((err) => {
        console.log(err);
        setIsServerMoviesError(true)
        // setIsFormDisabled(false)
      });
  }

  function handleSavedMovies() {
    mainApi.getSavedFilms()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res))
        console.log(res)
        setSavedMovies(res)
        setIsPreloader(false)
        setIsServerMoviesError(false)
      })
      .catch((err) => {
        console.log(err);
        setIsServerMoviesError(true)
        setIsNotFoundMovies(false)
      });
  }

  function handleDeleteSavedMovie(movie) {
    mainApi.movieDelete(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((film) => film._id !== movie._id));
        updateToSaveMovies(movie.movieId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlesavedMovie(movie) {
    const id = movie.id || movie.movieId;
    const savedMovie = savedMovies.find(item => item.movieId === id && item.owner === user._id);
    const isLiked = !!savedMovie;

    mainApi.changeSaveMovieStatus(savedMovie ?? movie, isLiked)
      .then((newMovie) => {
        handleSavedMovies()
        setMovies((films) =>
          films.map((film) => (
            film.id === movie.movieId ? newMovie : film))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateToSaveMovies(id) {
    const films = JSON.parse(localStorage.getItem('savedMovies'));
    localStorage.setItem('savedMovies', JSON.stringify(films.filter((film) => { return film.movieId !== id })))
  }

  function findSavedMovies(keyValue) {
    setSavedMovies(search.searchMovies(keyValue, JSON.parse(localStorage.getItem('savedMovies'))))
    localStorage.setItem('keyValueSavedMovies', keyValue)
  }

  function findByDuration(setFilms, films) {
    setFilms(search.searchMoviesByDuration(films))
  }

  // useEffect(() => {
  //   handleTokenCheck();
  // }, []);

  // useEffect(() => {
  //   if (isAuth) {
  //     // getFilms();
  //     // getSavedFilms();
  //   }
  // }, [isAuth]);

  if (!isAuthCkecked) {
    return (
      <Preloader />
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<ProtectedRoute isAuth={!user} />} >
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/signup" element={<ProtectedRoute isAuth={!user} />}>
          <Route path="" element={<Register />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute isAuth={user} />}>
          <Route path="" element={<Profile />} />
        </Route>

        {/* <Route path="/saved-movies" element={<ProtectedRoute isAuth={user} />}>
          <Route path="" element={
            <Movies
              movies={savedMovies}
              onHandleMovies={handleSavedMovies}
              onHandleMovieButton={handleDeleteSavedMovie}
              onGetFilms={findSavedMovies}
              onFindByDuration={findByDuration}
              onSetMovies={setSavedMovies}
              isLoading={isPreloader}
              isNotFoundMovies={isNotFoundMovies}
              isServerMoviesError={isServerMoviesError}
              onComponentSavedMovies={setIsComponentSavedMovies}
              onLoadedFilms={setLoadedFilms}
              onIsNotFoundMovies={setIsNotFoundMovies}
            />
          } />
        </Route>
        <Route path="/movies" element={<ProtectedRoute isAuth={user} />}>
          <Route path="" element={
            <MoviesProvider>
              <Movies
              // onGetFilms={findFilms}
              // movies={movies}
              // onSetMovies={setMovies}
              // onHandleMovieButton={handlesavedMovie}
              // savedMovies={savedMovies}
              // onFindByDuration={findByDuration}
              // isLoading={isPreloader}
              // onLoadedFilms={setLoadedFilms}
              // loadedFilms={loadedFilms}
              // isNotFoundMovies={isNotFoundMovies}
              // onIsNotFoundMovies={setIsNotFoundMovies}
              // isServerMoviesError={isServerMoviesError}
              // isFormDisabled={isFormDisabled}
              />
            </MoviesProvider>
          } />
        </Route>
        
        
        
        <Route path="*" element={<NotFound onIsHidden={setIsHidden} />}>
        </Route> */}
      </Routes>
    </div>
  )
}

export default App;