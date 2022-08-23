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
				<input className="search__input" type="search" placeholder="Фильм" disabled={props.isFormDisabled} onChange={handleKeyValue} value={keyValue}></input>
        <div className="search__icon"></div>
				<button className={`search__button ${props.isFormDisabled && "search__button_disabled"}`} disabled={props.isFormDisabled} type="submit"></button>
        <div className="search__vert-line"></div>
				<div className="search__wrapper">
          <FilterCheckbox
		  	handleCheck={props.handleCheck}
		/>
          <label className="search__title">Короткометражки</label>
				</div>
			</form>
		</section>
	);
}