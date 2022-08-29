import React, { useRef } from 'react';
import { Input } from '../Input/Input';
import './Profile.css';
import { useUser } from '../../services/User';
import { Header } from '../Header/Header';
import { Form } from '../Form/Form';

export const Profile = (props) => {
	const { user, updateUser, logout } = useUser();
	const [form, setForm] = React.useState({ name: user.name, email: user.email });
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
	const formRef = useRef();

	function handleForm(e) {
		setForm(oldForm => ({ ...oldForm, [e.target.name]: e.target.value }));

		if (e.target.validity.valid && e.target.value !== user[e.target.name]) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		updateUser(form);
		setIsButtonDisabled(true);
	}

	return (
		<>
			<Header isAuth={user} />
			<div className="profile">
				<h1 className="profile__title">Привет, {user.name}!</h1>
				<Form
					ref={formRef}
					className="profile__form"
					disabled={isButtonDisabled}
					typeButton="Редактировать"
					onSubmit={handleSubmit}
				>
					<div className="profile__wrapper">
						<Input
							className="profile__input"
							classNameError="profile__input_error"
							type="text"
							minLength="2"
							maxLength="30"
							name="name"
							value={form.name}
							required
							onChange={handleForm}
						/>
						<label className="profile__label">Имя</label>
					</div>
					<div className="profile__wrapper">
						<Input
							className="profile__input profile__input_email"
							classNameError="profile__input_error"
							type="email"
							minLength="2"
							maxLength="30"
							name="email"
							value={form.email}
							onChange={handleForm}
						/>
						<label className="profile__label">Email</label>
					</div>
				</Form>
				<button to="/signin" className="profile__link" onClick={logout}>Выйти из аккаунта</button>
			</div>
		</>
	);
}