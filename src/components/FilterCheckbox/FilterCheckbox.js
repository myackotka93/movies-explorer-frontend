import React, { useEffect, useState } from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = (props) => {
  const [checked, setChecked] = useState(false);

  function handleCheck(event) {
    setChecked(event.target.checked);
    props.handleCheck(event.target.checked);
  }

  useEffect(() => {
    if (typeof props.defaultValue === 'boolean') {
      setChecked(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" onChange={handleCheck} checked={checked} />
      <span className="checkbox__switch"></span>
    </label>
  );
}