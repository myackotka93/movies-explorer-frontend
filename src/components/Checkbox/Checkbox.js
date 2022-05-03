import React from 'react';
import './Checkbox.css';

export const Checkbox = () => {
	return (
			<label className="checkbox">
				<input className="checkbox__input" type="checkbox" />
				<span className="checkbox__switch"></span>
			</label>
	);
}