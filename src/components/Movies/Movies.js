import React, { useMemo, useState } from 'react';
import { searchMovies, searchMoviesByDuration } from '../../utils/search';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

export const Movies = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [check, setCheck] = useState(false);

  React.useEffect(()=> {
    props.onLoadedFilms(0)
    props.onIsNotFoundMovies(false)
  },[]);

  function onGetFilms(searchValue) {
    setSearchValue(searchValue)
  }

  function handleCheck(value) {
    setCheck(value)
  }

  const filteredMovies = useMemo(() => {
    const searchableMovies = searchMovies(searchValue, props.movies);
    return check ? searchMoviesByDuration(searchableMovies) : searchableMovies;
  }, [props.movies, searchValue, check]);

	return (
		<>
      <SearchForm
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
        isServerMoviesError={props.isServerMoviesError} />
		</>
	);
}