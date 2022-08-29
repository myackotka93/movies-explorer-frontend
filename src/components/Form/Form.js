import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

export const Form = React.forwardRef((props, formRef) => {
	const buttonClassName = `form__button ${props.disabled ? 'form__button_disable' : ''}`

	function handleSubmit(e) {
		e.preventDefault();

		if (props.disabled) {
			return;
		}
		
		if (formRef.current && formRef.current.checkValidity()) {
			props.onSubmit(e);
		}
	}

	return (
		<form autoComplete="false" noValidate className={classNames("form__container", props.className)} ref={formRef} onSubmit={handleSubmit}>
			{props.children}
			<button className={buttonClassName} disabled={props.disabled} type="submit">{props.typeButton}</button>
		</form>
	);
})