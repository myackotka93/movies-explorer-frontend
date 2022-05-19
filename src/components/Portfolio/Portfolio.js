import React from 'react';
import './Portfolio.css';
import image from '../../images/portfolio__image.svg';

export const Portfolio = () => {
	return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__item'>
        <li className='portfolio__item-element'>
          <a className='portfolio__item-text'
          href='#' rel="noreferrer" target="_blank">Статичный сайт</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
        <li className='portfolio__item-element'>
          <a className='portfolio__item-text '
          href='#' rel="noreferrer" target="_blank">Адаптивный сайт</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
        <li className='portfolio__item-element'>
          <a className='portfolio__item-text'
          href='#' rel="noreferrer" target="_blank">Одностраничное приложение</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
      </ul>            
    </section>
	);
}