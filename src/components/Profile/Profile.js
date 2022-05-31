import React from 'react';
import { Input } from '../Input/Input';
import './Profile.css';

export const Profile = (props) => {

	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');

	function handleName(e) {
		setName(e.target.value);
	}

	function handleEmail(e) {
		setEmail(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({
			name: name,
			email: email,
		});
	}

	React.useEffect(() => {
		props.onIsHiddenFooter(false)
		return () => {
			props.onIsHiddenFooter(true)
		}
	}, [])

	return (
		<div className="profile">
			<h1 className="profile__title">Привет, {currentUser.name}!</h1>
			<form className="profile__form" onSubmit={handleSubmit}>
				<div className="profile__wrapper">
					<Input
						className="profile__input"
						type="text"
            minLength="2"
						maxLength="30" 
            placeholder={currentUser.name}
						value={name}
						onChange={handleName} />
					<label className="profile__label">Имя</label>
				</div>
				<div className="profile__wrapper">
					<Input
						className="profile__input"
						type="email" 
            minLength="2"
						maxLength="30"
						placeholder={currentUser.email}
						value={email}
						onChange={handleEmail} />
					<label className="profile__label">Email</label>
				</div>
				<button className="profile__button" type="submit">Редактировать</button>
			</form>
			<button to="/signin" className="profile__link" onClick={props.onSignOut}>Выйти из аккаунта</button>
		</div>
	);
}