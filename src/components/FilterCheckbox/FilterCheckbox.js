import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = (props) => {
  function handleCheck(event) {
    props.handleCheck(event.target.checked);
 }

  return (
      <label className="checkbox">
        <input className="checkbox__input" type="checkbox" onChange={handleCheck} defaultChecked={props.defaultValue} />
        <span className="checkbox__switch"></span>
      </label>
  );
}