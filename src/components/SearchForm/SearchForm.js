import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export const SearchForm = (props) => {
	const [keyValue, setKeyValue] = React.useState();
	const [filterValue, setFilterValue] = React.useState();
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setKeyValue(props.search);
		setFilterValue(props.filter ?? false);
	}, [props.filter, props.search]);

	function handleKeyValue(e) {
		setKeyValue(e.target.value);
		setIsError(false);
	}

	function handleSearch(e) {
		e.preventDefault();

		if (!keyValue) {
			setIsError(true);
		} else {
			props.onSearch(keyValue);
		}
	}

	function handleFilter(value) {
		console.log(value);
		setFilterValue(value)
		props.onFilter(value);
	}


	return (
		<section className="search">
			<form className="search__form" onSubmit={handleSearch}>
				<input
					className={classNames("search__input search__img", { 'search__input_error': isError })}
					type="search"
					placeholder="Фильм"
					onChange={handleKeyValue}
					defaultValue={keyValue}
					onFocus={handleKeyValue} 
				/>

				<button
					className={classNames('search__button')}
					type="submit"
				></button>
				<div className="search__vert-line"></div>
				<div className="search__wrapper">
					<FilterCheckbox handleCheck={handleFilter} defaultValue={filterValue} />
					<label className="search__title">Короткометражки</label>
				</div>
				{isError && <span className='search__error'>Нужно ввести ключевое слово</span>}
			</form>
		</section>
	);
}