import React from 'react';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export const SearchForm = (props) => {

  const [keyValue, setKeyValue] = React.useState('');

  function handleKeyValue(e) {
		setKeyValue(e.target.value)
	}

	function handleSearch(e) {
		e.preventDefault()
		props.onGetFilms(keyValue)
	}

	return (
		<section className="search">
			<form className="search__form" onSubmit={handleSearch}>
				<input className="search__input" type="search" placeholder="Фильм" onChange={handleKeyValue} value={keyValue} required></input>
        <div class="search__icon"></div>
				<button className="search__button" type="submit"></button>
        <div class="search__vert-line"></div>
				<div className="search__wrapper">
          <FilterCheckbox
						onFindByDuration={props.onFindByDuration}
						movies={props.movies}
						onSetMovies={props.onSetMovies}
						keyValue={keyValue}
						onGetFilms={props.onGetFilms} />
          <label className="search__title">Короткометражки</label>
				</div>
			</form>
		</section>
	);
}