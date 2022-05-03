import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './SearchForm.css';

export const SearchForm = () => {
	return (
		<section className="search">
			<form className="search__form">
				<input className="search__input" type="search"placeholder="Фильм"></input>
				<button className="search__button"></button>
				<div className="search__wrapper">
                <Checkbox/>
				<label className="search__title">Короткометражки</label>
				</div>
			</form>
		</section>
	);
}