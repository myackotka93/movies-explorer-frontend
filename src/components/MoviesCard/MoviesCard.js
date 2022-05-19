import React from 'react';
import './MoviesCard.css';

export const MoviesCard = (props) => {
	return (
		<div className="movies-card">
		<div className="movies-card__info">
			<p className="movies-card__title">33 слова о дизайне</p>
			<button type="button" className="movies-card__button" />
		</div>
		<p className="movies-card__time">1ч 42м</p>
		<img className="movies-card__image" src={props.img} alt='Постер'/>
	</div>







	)
}