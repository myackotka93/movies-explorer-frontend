import React from 'react';
import { Heading } from '../Heading/Heading';
import './AboutMe.css';
import image from '../../images/about-me__photo.png'

export const AboutMe = () => {
	return (
		<section className="about-me">
			<Heading name="Студент"/>
			<div className="about-me__wrapper">
			<h2 className="about-me__title">Валерия</h2>
			<p className="about-me__subtitle">Фронтенд-разработчик, 28 лет</p>
			<p className="about-me__text">Я родилась в городе Дзержинск, но сейчас живу в Санкт Петербурге. Раньше я работала метрологом на обороннм заводе, но сейчас я заканиваю курс по веб-разработкев Яндексе и хочу быть успешным программистом. На данный момент работаю джуном в Планетарии 1.</p>
			<div className="about-me__links">
				<a className="about-me__link" href="https://vk.com/myackotka" target="_blank">Вконтакте</a>
				<a className="about-me__link" href="https://github.com/myackotka93" target="_blank">Github</a>
			</div>
			<img className="about-me__photo" src={image} alt="Моя фотография"/>
			</div>
		</section>
	);
}