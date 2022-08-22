import "./App.css";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App(props) {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenFooter, setIsHiddenFooter] = useState(true);
  const [movies, setMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", id: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [isOpenFail, setIsOpenFail] = React.useState(false);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [loadedFilms, setLoadedFilms] = React.useState(0);
  const [isNotFoundMovies, setIsNotFoundMovies] = React.useState(true);
  const [isServerMoviesError, setIsServerMoviesError] = React.useState(false);
  const [isComponentSavedMovies, setIsComponentSavedMovies] = React.useState(false);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false)
  const navigate = useNavigate();

  function modalClose() {
    setIsOpenSuccess(false)
    setIsOpenFail(false)
  }

  function handleLink(boolean) {
    setIsAuth(boolean);
  }

  function handleRegister(name, email, password) {
    setIsFormDisabled(true)
    mainApi.register(name, email, password)
      .then((res) => {
        navigate('/signin');
        setIsFormDisabled(false)
      })
      .catch((err) => {
        setIsOpenFail(true);
        setIsFormDisabled(false)
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    setIsFormDisabled(true)
    mainApi.authorize(email, password)
      .then((res) => {
        setIsAuth(true)
        navigate('/movies');
        localStorage.setItem('token', res.token);
        setIsFormDisabled(false);
      })
      .catch((err) => {
        setIsOpenFail(true);
        setIsFormDisabled(false)
        console.log(err);
      }
      );
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      mainApi.checkToken()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
          setIsAuth(false);
        });
    }
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
    
    navigate('/signin');
  }

  function handleUpdateUser(data) {
    setIsFormDisabled(true)
    mainApi.setUserInfo(data.name, data.email)
      .then((res) => {
        setCurrentUser(res);
        setIsOpenSuccess(true);
        setIsFormDisabled(false)
      })
      .catch((err) => {
        setIsOpenFail(true)
        setIsFormDisabled(false)
        console.log(err);
      });
  }

  function getFilms(keyValue) {
    setIsPreloader(true)
    setIsNotFoundMovies(false)
    setIsFormDisabled(true)

    moviesApi.getFilms()
      .then((res) => {
        setMovies(res);
        handleNotFoundMovies(movies)
        setIsPreloader(false);
        setIsServerMoviesError(false)
        setIsFormDisabled(false)
      })
      .catch((err) => {
        console.log(err);
        setIsServerMoviesError(true)
        setIsNotFoundMovies(false)
        setIsFormDisabled(false)
      });
  }

  function handleNotFoundMovies(films) {
    if (films.length === 0) {
      setIsNotFoundMovies(true)
    }
  }

  function handleSavedMovies() {
    setIsNotFoundMovies(false)
    if (isComponentSavedMovies) setIsPreloader(true)
    mainApi.getFilms()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res))
        console.log(res)
        setSavedMovies(res)
        handleNotFoundMovies(savedMovies)
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
    mainApi.movieDelete(movie.movieId)
      .then(() => {
        setSavedMovies((movies) => movies.filter((film) => film.movieId !== movie.movieId));
        updateToSaveMovies(movie.movieId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlesavedMovie(movie) {
    const id = movie.id || movie.movieId;
    console.log(movie)
    const isLiked = savedMovies.some(item => item.movieId === id && item.owner === currentUser.id);
    console.log(isLiked)
    mainApi.changeSaveMovieStatus(movie, isLiked)
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
    handleNotFoundMovies(savedMovies)
    localStorage.setItem('keyValueSavedMovies', keyValue)
  }

  function findByDuration(setFilms, films) {
    setFilms(search.searchMoviesByDuration(films))
    handleNotFoundMovies(savedMovies)

  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isAuth) {
      getFilms()
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth && localStorage.getItem('keyValueSavedMovies')) {
      findSavedMovies(localStorage.getItem('keyValueSavedMovies'))
    }
  }, [isAuth]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {isHidden && <Header isAuth={isAuth} />}
        <Routes>
          <Route path="/" element={<Main setAuth={handleLink} />} />
          <Route path="/saved-movies" element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="" element={
              <SavedMovies
                savedMovies={savedMovies}
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
          <Route path="/movies" element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="" element={
              <Movies
                // onGetFilms={findFilms}
                movies={movies}
                onSetMovies={setMovies}
                onHandleMovieButton={handlesavedMovie}
                savedMovies={savedMovies}
                onFindByDuration={findByDuration}
                isLoading={isPreloader}
                onLoadedFilms={setLoadedFilms}
                loadedFilms={loadedFilms}
                isNotFoundMovies={isNotFoundMovies}
                onIsNotFoundMovies={setIsNotFoundMovies}
                isServerMoviesError={isServerMoviesError}
                isFormDisabled={isFormDisabled}
              />
            } />
          </Route>
          <Route path="/profile" element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="" element={
              <Profile
                onIsHiddenFooter={setIsHiddenFooter}
                onSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
                isFormDisabled={isFormDisabled}
              />
            } />

          </Route>
          <Route path="/signup" element={<Register
            onIsHidden={setIsHidden}
            onRegister={handleRegister}
            isFormDisabled={isFormDisabled} />}>

          </Route>
          <Route path="/signin" element={<Login
            onIsHidden={setIsHidden}
            onLogin={handleLogin}
            isFormDisabled={isFormDisabled}
          />}>

          </Route>
          <Route path="*" element={<NotFound onIsHidden={setIsHidden} />}>
          </Route>
        </Routes>
        {isHidden && isHiddenFooter && <Footer />}
      </CurrentUserContext.Provider>
      <InfoToolTip
        title="Редактирование профиля прошло успешно"
        isOpen={isOpenSuccess}
        onClose={modalClose} />
      <InfoToolTip
        title="Произошла ошибка"
        isOpen={isOpenFail}
        onClose={modalClose} />
    </div>
  )
}

export default App;