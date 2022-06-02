import React from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const MoviesCard = (props) => {

	const {nameRU, image, duration} = props.movie;
  const currentUser = React.useContext(CurrentUserContext);
  const id = props.movie.id || props.movie.movieId;
  const savedMovies = props.savedMovies || [];
  const isLiked = props.savedMovies.some(item => item.movieId === id && item.owner === currentUser.id);
  const movieSavedButtonClassName = (`movies-card__button ${isLiked && 'movies-card__button_like_active'}`);
  const buttonState = props.component === 'movies';

	function handleButton() {
		props.onHandleMovieButton(props.movie)
	}

	return (
		<div className="movies-card">
		<div className="movies-card__info">
			<h2 className="movies-card__title">{nameRU}</h2>
      {buttonState && <button onClick={handleButton} className={movieSavedButtonClassName}></button>}
			{!buttonState && <button onClick={handleButton} className="movies-card__button movies-card__button_delete_card"></button>}
		</div>
		<p className="movies-card__time">{duration}</p>
		<img className="movies-card__image" src={returnLink()} alt='Постер с фильмом' />
	</div>
 )
}