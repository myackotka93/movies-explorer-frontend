import React, { useEffect, useMemo, useState } from 'react';
import { useMovies } from '../../services/Movies';
import { searchMovies, searchMoviesByDuration } from '../../utils/search';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

const Movies = (props) => {
  // const [searchValue, setSearchValue] = useState('');
  // const [check, setCheck] = useState(false);
  const { movies, getMovies, clearMovies } = useMovies();

  useEffect(() => {
    getMovies();

    return () => {
      console.log(movies);
    }
  }, []);

  // function onGetFilms(searchValue) {
  //   setSearchValue(searchValue)
  // }

  // function handleCheck(value) {
  //   setCheck(value)
  // }

  // const filteredMovies = useMemo(() => {
  //   const searchableMovies = searchMovies(searchValue, props.movies);
  //   return check ? searchMoviesByDuration(searchableMovies) : searchableMovies;
  // }, [props.movies, searchValue, check]);

  return (
    <>
      {/* <SearchForm
        onGetFilms={onGetFilms}
        onFindByDuration={props.onFindByDuration}
        movies={props.movies}
        onSetMovies={props.onSetMovies}
        isFormDisabled={props.isFormDisabled}
        handleCheck={handleCheck}
      />

      <MoviesCardList
        movies={filteredMovies}
        onHandleMovieButton={props.onHandleMovieButton}
        savedMovies={props.savedMovies}
        component='movies'
        onSetMovies={props.onSetMovies}
        isLoading={props.isLoading}
        onLoadedFilms={props.onLoadedFilms}
        loadedFilms={props.loadedFilms}
        isNotFoundMovies={props.isNotFoundMovies}
        isServerMoviesError={props.isServerMoviesError} /> */}
    </>
  );
}

export default React.memo(Movies);

