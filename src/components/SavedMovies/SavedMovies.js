import React, { useState } from 'react';
import { useMovies } from '../../services/Movies';
import { useUser } from '../../services/User';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

export const SavedMovies = (props) => {
  const [form, setForm] = useState({ search: '', filter: false });
  const { user } = useUser();
  const { savedMovies, getSavedMovies, toggleSaveMovie, isMovieLoading, isError } = useMovies();

  function handleSearch({ search, filter }) {
    let isChange = false;
    if (form.search !== search || form.filter !== filter) {
      isChange = true;
    }

    if (isChange) {
      setForm({ search, filter });
      getSavedMovies({ search, filter })
    }
  }

  function handleMovieButton(movie) {
    toggleSaveMovie(movie, form);
  }

  return (
    <>
      <Header isAuth={user} />
      <SearchForm onSearch={handleSearch} />
      <div className="card-list">
        <MoviesCardList
          movies={savedMovies}
          isLoading={isMovieLoading}
          isServerMoviesError={isError}
          onHandleMovieButton={handleMovieButton}
        />
      </div>
      <Footer />
    </>
  );
}