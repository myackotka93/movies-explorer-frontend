import React from 'react';
import './Footer.css';

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
				<div className="footer__wrapper">
					<p className="footer__author">&copy; 2022</p>
					<nav>
						<ul className="footer__links">
							<li className="footer__wrapper-link"><a href="https://hd.kinopoisk.ru/" target="_blank" className="footer__link" rel="noopener noreferrer">Яндекс.Практикум</a></li>
							<li className="footer__wrapper-link"><a href="https://github.com/myackotka93" className="footer__link" target="_blank" rel="noopener noreferrer">Github</a></li>
							<li className="footer__wrapper-link"><a href="https://vk.com/myackotka" className="footer__link" target="_blank" rel="noopener noreferrer">VK</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
}