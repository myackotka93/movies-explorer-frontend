import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = (props) => {

  const [isChecked, setIsChecked] = React.useState(false);

  function handleCheck() {
    if(isChecked){
			setIsChecked(false)
			props.onGetFilms(props.keyValue)
		} else{
			setIsChecked(true)
			props.onFindByDuration(props.onSetMovies, props.movies)
		}
 }

  return (
      <label className="checkbox">
        <input className="checkbox__input" type="checkbox" onChange={handleCheck} checked={isChecked} />
        <span className="checkbox__switch"></span>
      </label>
  );
}