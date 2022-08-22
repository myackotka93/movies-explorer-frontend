import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = (props) => {
	const navigate = useNavigate();

	React.useEffect(() => {
		props.onIsHidden(false)
		return () => {
			props.onIsHidden(true)
		}
	}, []);

	function goBack() {
		navigate(-1);
	}

	return (
		<div className="error">
			<h1 className="error__title">404</h1>
			<p className="error__subtitle">Страница не найдена</p>
			<button className="error__button" onClick={goBack}>Назад</button>
		</div>
	);
}