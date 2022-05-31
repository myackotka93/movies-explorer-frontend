import React from 'react';
import './Input.css';

export const Input = (props) => {

	function handleChange(e) {
		props.onChange(e);
	  }

	return (
		<div className="input">
			<input className={props.className} onChange={handleChange} value={props.value} type={props.type} minLength={props.minLength} maxLength={props.maxLength} required></input>
			<span className="input__error"></span>
		</div>
	);
}