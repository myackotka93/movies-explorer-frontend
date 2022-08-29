import "./App.css";
import { Main } from "../Main/Main";
import Movies from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import React from "react";
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import MoviesProvider from "../../services/Movies";
import { useUser } from "../../services/User";
import { Preloader } from "../Preloader/Preloader";

function App() {
  const { user, isAuthCkecked } = useUser();

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
        <Route path="/movies" element={<ProtectedRoute isAuth={user} />}>
          <Route path="" element={
            <MoviesProvider>
              <Movies />
            </MoviesProvider>
          } />
        </Route>
        <Route path="/saved-movies" element={<ProtectedRoute isAuth={user} />}>
          <Route path="" element={
            <MoviesProvider>
              <SavedMovies />
            </MoviesProvider>
          } />
        </Route>        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;