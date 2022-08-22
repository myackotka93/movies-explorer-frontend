import React, { useMemo, useState } from 'react';
import { searchMovies } from '../../utils/search';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

export const Movies = (props) => {
  const [searchValue, setSearchValue] = useState('');

  React.useEffect(()=> {
    props.onLoadedFilms(0)
    props.onIsNotFoundMovies(false)
  },[]);

  function onGetFilms(searchValue) {
    setSearchValue(searchValue)
  }

  const filteredMovies = useMemo(() => searchMovies(searchValue, props.movies), [props.movies, searchValue]);

	return (
		<>
      <SearchForm
        onGetFilms={onGetFilms} 
				onFindByDuration={props.onFindByDuration}
				movies={props.movies}
				onSetMovies={props.onSetMovies}
        isFormDisabled={props.isFormDisabled}
        keyValue="keyValueMovies" 
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