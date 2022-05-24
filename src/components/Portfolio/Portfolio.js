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
          href='https://github.com/myackotka93/how-to-learn' rel="noreferrer" target="_blank" alt="Ссылка на проект">Статичный сайт</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
        <li className='portfolio__item-element'>
          <a className='portfolio__item-text '
          href='https://github.com/myackotka93/russian-travel' rel="noreferrer" target="_blank" alt="Ссылка на проект">Адаптивный сайт</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
        <li className='portfolio__item-element'>
          <a className='portfolio__item-text'
          href='https://domainname.myackotka.nomoredomains.work/' rel="noreferrer" target="_blank" alt="Ссылка на проект">Одностраничное приложение</a>
          <img className='portfolio__item-img' alt='Стрелка' src={image} />
        </li>
      </ul>            
    </section>
	);
}