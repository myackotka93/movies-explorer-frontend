import React from 'react';
import './MoviesCard.css';

export const MoviesCard = (props) => {
	return (
		<div className="movies-card">
		<div className="movies-card__info">
			<p className="movies-card__title">{props.title}</p>
      {!props.isSavedMovies && <button className={`movies-card__button ${props.isLiked && 'movies-card__button_save_active'}`}></button>}
			{props.isSavedMovies && <button className="movies-card__button movies-card__button_delete_card"></button>}
		</div>
		<p className="movies-card__time">{props.time}</p>
		<img className="movies-card__image" src={props.img} alt='Постер с фильмом' />
	</div>
 )
}