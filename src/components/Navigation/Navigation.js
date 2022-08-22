import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { Hamburger } from '../Hamburger/Hamburger';
import classnames from 'classnames';

export const Navigation = (props) => {
	return (
		<>
			{props.isAuth && <nav className="navigation">
				<div className="navigation__wrapper navigation__wrapper_hidden">
					<NavLink to="/movies" className={({isActive}) => classnames("navigation__link", {"navigation__link_active": isActive})}>Фильмы</NavLink>
					<NavLink to="/saved-movies" className={({isActive}) => classnames("navigation__link", {"navigation__link_active": isActive})}>Сохранённые фильмы</NavLink>
				</div>
				<div className="navigation__wrapper navigation__wrapper_hidden">
					<NavLink to="/profile" className={({isActive}) => classnames("navigation__link navigation__link_with_signin", {"navigation__link_account": isActive})}>Аккаунт</NavLink>
				</div>
				<Hamburger class="header__hamburger header__hamburger_with_signin" onHamburgerOpen={props.onHamburgerOpen} />
			</nav>}
			{!props.isAuth && <nav className="navigation navigation_without_signin" >
				<div className="navigation__wrapper navigation__wrapper_without_signin">
					<Link to="/signup" className="navigation__link">Регистрация</Link>
					<Link to="/signin" className="navigation__link navigation__link_type_button">Войти</Link>
				</div>
			</nav>}

			<div className={`popup ${props.isOpenHamburger && "popup_opened"}`}>
				<div className="popup__container">
					<div className="popup__wrapper">
					<NavLink  className={({isActive}) => classnames('popup__link', {"popup__link_active": isActive})} to="/">Главная</NavLink>
					<NavLink  className={({isActive}) => classnames('popup__link', {"popup__link_active": isActive})} to="/movies">Фильмы</NavLink>
					<NavLink  className={({isActive}) => classnames('popup__link', {"popup__link_active": isActive})} to="/saved-movies">Сохранённые фильмы</NavLink>
					</div>
					<div className="popup__wrapper popup__wrapper_aligning">
					<Link to="/profile" className="popup__link">Аккаунт</Link>
				</div>
					<button className="popup__button" onClick={props.onHamburgerClose}></button>
				</div>
			</div>
		</>
	);
}