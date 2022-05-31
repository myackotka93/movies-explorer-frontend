import "./App.css";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import React from "react";
import * as mainApi from "../../utils/MainApi.js";
import * as moviesApi from "../../utils/MoviesApi.js";
import * as search from "../../utils/search.js";
import { Route, Switch, withRouter } from 'react-router-dom';
import { ProtectedRoute } from "../ProtectedRoute";

function App(props) {

  const [isAuth, setIsAuth] = React.useState(false);
  const [isSavedMovies, setIsSavedMovies] = React.useState(true);
  const [isHidden, setIsHidden] = React.useState(true);
  const [isHiddenFooter, setIsHiddenFooter] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: "", email: "", id: "" });
  const [isDurationMovies, setIsDurationMovies] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  function handleLink(boolean) {
    setIsAuth(boolean);
}

function handleRegister(name, email, password) {
  auth.register(name, email, password)
    .then((res) => {
      props.history.push('/signin');
    })
    .catch((err) => {
      console.log(err)
    }
    );
}

function handleLogin(email, password) {
  auth.authorize(email, password)
    .then((res) => {
      setIsAuth(true)
      props.history.push('/movies');
      localStorage.setItem('auth', true);
    })
    .catch((err) => {
      console.log(err)
    }
    );
}

function handleTokenCheck() {
  if (localStorage.getItem('auth')) {
    mainApi.checkToken()
      .then((res) => {
        if (res) {
          setIsAuth(true);
          props.history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

function handleSignOut() {
  mainApi.signOut()
    .then((res) => {
      props.history.push('/signin');
      setIsAuth(false);
      localStorage.removeItem('auth');
    })
    .catch((err) => {
      console.log(err)
    }
    );
}

function handleUpdateUser(data) {
  mainApi.setUserInfo(data.name, data.email)
    .then((res) => {
      setCurrentUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getFilms() {
  if(!localStorage.getItem('movies')){
    moviesApi.getFilms()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleSavedMovies() {
  mainApi.getFilms()
    .then((res) => {
      console.log(res)
      setSavedMovies(res)
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

function findFilms(keyValue) {
  handleSavedMovies()
  getFilms();
  search.handleSearch(keyValue, JSON.parse(localStorage.getItem('movies')), isDurationMovies, setMovies);
}

React.useEffect(() => {
  handleTokenCheck();
}, []);

React.useEffect(() => {
  if (isAuth) {
    mainApi.getUserInfo()
      .then((res) => {
        setCurrentUser(res.res)
        console.log(res.res)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [isAuth]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {isHidden && <Header isAuth={isAuth} />}
          <Switch>
            <Route exact path="/">
              <Main setAuth={handleLink} />
            </Route>
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isAuth={isAuth} />
            <ProtectedRoute
              path="/movies"
              component={Movies}
              isSavedMovies={isSavedMovies}
              isAuth={isAuth}
              onGetFilms={findFilms}
              movies={movies}
              onIsDuration={setIsDurationMovies}
              isDuration={isDurationMovies}
              onHandleMovieButton={handlesavedMovie}
              savedMovies={savedMovies} />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              onIsHiddenFooter={setIsHiddenFooter}
              isAuth={isAuth} 
              onSignOut={handleSignOut} 
              onUpdateUser={handleUpdateUser} />
            <Route path="/signup">
              <Register 
                onIsHidden={setIsHidden} 
                onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login 
                onIsHidden={setIsHidden} 
                onLogin={handleLogin} />
            </Route>
            <Route path="*">
              <NotFound onIsHidden={setIsHidden} />
            </Route>
          </Switch>
          {isHidden && isHiddenFooter && <Footer />}
        </CurrentUserContext.Provider>
    </div>
  )
}

export default withRouter(App);