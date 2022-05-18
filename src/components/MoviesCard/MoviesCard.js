import React from 'react';
import './MoviesCard.css';

export const MoviesCard = (props) => {
	return (
		<div className="movies-card">
			<div className="movies-card__wrapper">
				<h2 className="movies-card__title">{props.title}</h2>
				<button className="movies-card__button"></button>
			</div>
			<p className="movies-card__time">{props.time}</p>
            <img className="movies-card__image" alt="Картинка к фильму" src={props.img} />
		</div>
	)
}