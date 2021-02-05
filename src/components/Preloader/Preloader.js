import React from 'react';
import NotFoundIcon from '../../images/not-found-icon.png';

function Preloader({ isPrelodaerOpen, cards }) {
  return (
    //для проверки в следующей строке добавить класс preloader__visible
    <section
      className={`preloader ${(isPrelodaerOpen || cards.length === 0) && 'preloader__visible'}`}
    >
      {/* одновременно с первым комментарием для проверки в следующей строке добавить класс circle-preloader__container_visible */}
      <div
        className={`circle-preloader__container ${
          isPrelodaerOpen && 'circle-preloader__container_visible'
        }`}
      >
        <div className='circle-preloader'></div>
        <p className='preloader__text'>Идет поиск новостей...</p>
      </div>
      {/* одновременно с первым комментарием для проверки в следующей строке добавить класс preloader__container_visible */}
      <div
        className={`preloader__container ${
          cards.length === 0 && !isPrelodaerOpen && 'preloader__container_visible'
        }`}
      >
        <img src={NotFoundIcon} alt='Not found icon' className='preloader__not-found-icon' />
        <h3 className='preloader__title'>Ничего не найдено</h3>
        <p className='preloader__text'>К сожалению по вашему запросу ничего не найдено.</p>
      </div>
    </section>
  );
}

export default Preloader;
