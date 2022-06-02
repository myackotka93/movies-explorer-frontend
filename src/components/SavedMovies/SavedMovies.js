import React from 'react';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';

export const SavedMovies = (props) => {

  React.useEffect(() => {
		props.onHandleMovies()
	}, [])
  
	return (
		<>
			<SearchForm
        onGetFilms={props.onGetFilms}
        movies={props.savedMovies}
        onFindByDuration={props.onFindByDuration}
        onSetMovies={props.onSetMovies} />
      <div className="card-list">
        <MoviesCardList
          movies={props.savedMovies}
          component='savedMovies'
          onHandleMovieButton={props.onHandleMovieButton}
          isLoading={props.isLoading} />
      </div>
		</>
	);
}