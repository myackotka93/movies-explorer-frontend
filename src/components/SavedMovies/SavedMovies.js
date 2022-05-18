import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { SearchForm } from '../SearchForm/SearchForm';
import img1 from "../../images/card1.png";
import img2 from "../../images/card2.png";
import img3 from "../../images/card3.png";

export const SavedMovies = () => {
	return (
		<>
			<SearchForm />
			<div className="card-list">
			<div className="card-list__wrapper">
			<MoviesCard
				img={img1}
				title="33 слова о дизайне"
				time="1ч 47м" />
			<MoviesCard
				img={img2}
				title="33 слова о дизайне»"
				time="1ч 47м" />
			<MoviesCard
				img={img3}
				title="33 слова о дизайне"
				time="1ч 47м" />
				</div>
				</div>
		</>
	);
}