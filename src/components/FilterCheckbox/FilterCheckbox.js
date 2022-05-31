import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = (props) => {

  function handleCheck() {
  props.onIsDuration(!props.isDuration)
 }

  return (
      <label className="checkbox">
        <input className="checkbox__input" type="checkbox" onChange={handleCheck} checked={props.isDuration} />
        <span className="checkbox__switch"></span>
      </label>
  );
}