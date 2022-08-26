import classNames from 'classnames';
import React from 'react';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export const SearchForm = (props) => {
	const [keyValue, setKeyValue] = React.useState(props.search);
	const [filterValue, setFilterValue] = React.useState(props.filter ?? false);

	function handleKeyValue(e) {
		setKeyValue(e.target.value)
	}

	function handleSearch(e) {
		e.preventDefault()
		props.onSearch({ search: keyValue, filter: filterValue });
	}

	function handleFilter(value) {
		setFilterValue(value)
	}

	return (
		<section className="search">
			<form disabled={!keyValue && !filterValue} className="search__form" onSubmit={handleSearch}>
				<input className="search__input search__img" type="search" placeholder="Фильм" onChange={handleKeyValue} defaultValue={keyValue}></input>
				<button
					className={classNames('search__button', {'search__button_disabled': !keyValue && !filterValue})}
					disabled={!keyValue && !filterValue}
					type="submit"
				></button>
				<div className="search__vert-line"></div>
				<div className="search__wrapper">
					<FilterCheckbox handleCheck={handleFilter} defaultValue={filterValue} />
					<label className="search__title">Короткометражки</label>
				</div>
			</form>
		</section>
	);
}