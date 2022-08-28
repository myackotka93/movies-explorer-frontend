import React, { useEffect, useState } from 'react';
import { useMovies } from '../../services/Movies';
import { useUser } from '../../services/User';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';


const Movies = (props) => {
  const [form, setForm] = useState(null);
  const { movies, getMovies, isMovieLoading, toggleSaveMovie, isError } = useMovies();
  const { user } = useUser();

  useEffect(() => {
    const defaultSearch = localStorage.getItem('search') ?? '';
    const defaultFilter = localStorage.getItem('filter') === 'true' ? true : false;

    setForm({search: defaultSearch, filter: defaultFilter});
  }, []);

  useEffect(() => {
    if (form) {
      getMovies(form);
    }
  }, [form, getMovies]);

  function handleSearch(search) {
    localStorage.setItem('search', search);
    setForm(oldForm => ({ ...oldForm, search }));
  }

  function handleFilter(filter) {
    localStorage.setItem('filter', filter);
    setForm(oldForm => ({ ...oldForm, filter }));
  }

  function handleMovieButton(movie) {
    toggleSaveMovie(movie, form);
  }

  return (
    <>
      <Header isAuth={user} />
      <SearchForm
        onSearch={handleSearch}
        onFilter={handleFilter}
        search={form?.search}
        filter={form?.filter}
      />

      <MoviesCardList
        movies={movies}
        component="movies"
        isLoading={isMovieLoading}
        onHandleMovieButton={handleMovieButton}
        isServerMoviesError={isError}
      />
      <Footer />
    </>
  );
}

export default React.memo(Movies);

