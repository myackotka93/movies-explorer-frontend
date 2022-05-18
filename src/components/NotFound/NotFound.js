import React from 'react';
import './NotFound.css';

export const NotFound = () => {
	return (
		<div className="error">
			<h1 className="error__title">404</h1>
			<p className="error__subtitle">Страница не найдена</p>
			<button className="error__button" href="#">Назад</button>
		</div>
	);
}