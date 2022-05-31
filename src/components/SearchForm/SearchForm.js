import React from 'react';
import './SearchForm.css';

export const SearchForm = () => {
	return (
		<section className="search">
			<form className="search__form">
				<input className="search__input" type="search" placeholder="Фильм" required></input>
        <div class="search__icon"></div>
				<button className="search__button"></button>
        <div class="search__vert-line"></div>
				<div className="search__wrapper">
          <label className="checkbox">
            <input className="checkbox__input" type="checkbox" />
            <span className="checkbox__switch"></span>
          </label>
          <label className="search__title">Короткометражки</label>
				</div>
			</form>
		</section>
	);
}