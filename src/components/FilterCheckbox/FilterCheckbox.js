import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);

  function handleCheck(event) {
    props.handleCheck(event.target.checked);
    setIsChecked(s => !s);		
 }

  return (
      <label className="checkbox">
        <input className="checkbox__input" type="checkbox" onChange={handleCheck} checked={isChecked} />
        <span className="checkbox__switch"></span>
      </label>
  );
}