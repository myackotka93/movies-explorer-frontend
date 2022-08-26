import React from 'react';
import { useMovies } from '../../services/Movies';
import { useUser } from '../../services/User';
import './MoviesCard.css';

export const MoviesCard = (props) => {
	const { nameRU, image, duration } = props.movie;
	const { user } = useUser();
	const { savedMovies } = useMovies();
	const id = props.movie.id || props.movie.movieId;
	const trailer = props.movie.trailerLink || props.movie.trailer
	const isLiked = savedMovies.some(item => item.movieId === id && item.owner === user._id);
	const movieSavedButtonClassName = (`movies-card__button ${isLiked && 'movies-card__button_like_active'}`);
	const buttonState = props.component === 'movies';

	function handleButton() {
		props.onHandleMovieButton(props.movie)
	}

	function returnLink() {
		if (typeof image === 'object') {
			return 'https://api.nomoreparties.co' + image.url
		} else {
			return image
		}
	}

	function returnDuration() {
		if (duration <= 60) {
			return duration + 'м'
		}
		const hours = Math.trunc(duration / 60);
		const minutes = duration % 60;
		return hours + 'ч ' + minutes + 'м';
	}

	return (
		<div className="movies-card">
			<div className="movies-card__info">
				<h2 className="movies-card__title">{nameRU}</h2>
				{buttonState && <button onClick={handleButton} className={movieSavedButtonClassName}></button>}
				{!buttonState && <button onClick={handleButton} className="movies-card__button movies-card__button_delete_card"></button>}
			</div>
			<p className="movies-card__time">{returnDuration()}</p>
			<a href={trailer} target="_blank" rel="noreferrer">
				<img className="movies-card__image" src={returnLink()} alt='Постер с фильмом' />
			</a>
		</div>
	)
}