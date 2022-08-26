import React, {  useState } from 'react';
import { useMovies } from '../../services/Movies';
import { useUser } from '../../services/User';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

const defaultSearch = localStorage.getItem('search') ?? '';
const defaultFilter = localStorage.getItem('filter') === 'true' ? true : false;

const Movies = (props) => {
  const [form, setForm] = useState({ search: defaultSearch, filter: defaultFilter });
  const { movies, getMovies, isMovieLoading, toggleSaveMovie, isError } = useMovies();
  const { user } = useUser();

  function handleSearch({ search, filter }) {
    localStorage.setItem('search', search);
    localStorage.setItem('filter', filter);

    let isChange = false;
    if (form.search !== search || form.filter !== filter) {
      isChange = true;
    }

    if (isChange) {
      setForm({ search, filter });
      getMovies({ search, filter })
    }
  }

  function handleMovieButton(movie) {
    toggleSaveMovie(movie, form);
  }

  return (
    <>
      <Header isAuth={user} />
      <SearchForm
        onSearch={handleSearch}
        search={defaultSearch}
        filter={defaultFilter}
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

