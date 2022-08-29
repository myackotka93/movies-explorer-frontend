import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    return () => {
      getSavedMovies();
    }
  }, [getSavedMovies]);

  function handleSearch(search) {
    setForm(oldForm => ({ ...oldForm, search }));
    getSavedMovies({ filter: form.filter, search });
  }

  function handleFilter(filter) {
    setForm(oldForm => ({ ...oldForm, filter }));
    getSavedMovies({ search: form.search, filter });
  }

  function handleMovieButton(movie) {
    toggleSaveMovie(movie, form);
  }

  return (
    <>
      <Header isAuth={user} />
      <SearchForm onSearch={handleSearch} onFilter={handleFilter} />
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