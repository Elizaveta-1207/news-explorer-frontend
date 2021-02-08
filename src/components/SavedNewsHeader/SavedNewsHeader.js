import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ savedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  let allKeywords = savedArticles.map((i) => i.keyword);
  let keywords = allKeywords.filter((item, index) => allKeywords.indexOf(item) === index);

  //   console.log(keywords);
  //   console.log(currentUser);
  return (
    <section className='news-header'>
      <p className='news-header__heading'>Сохранённые статьи</p>

      {savedArticles.length === 0 && (
        <h2 className='news-header__info'>{currentUser.name}, у вас пока нет сохранённых статей</h2>
      )}

      {savedArticles.length === 1 && (
        <>
          <h2 className='news-header__info'>
            {currentUser.name}, у вас {savedArticles.length} сохранённая статья
          </h2>

          {/* <p className='news-header__tags'>
            По ключевому слову: <span className='news-header__tag'>Бои</span>
          </p> */}
        </>
      )}

      {savedArticles.length > 1 && savedArticles.length < 5 && (
        <>
          <h2 className='news-header__info'>
            {currentUser.name}, у вас {savedArticles.length} сохранённых статьи
          </h2>

          {/* <p className='news-header__tags'>
            По ключевым словам: <span className='news-header__tag'>Бои</span>,{' '}
            <span className='news-header__tag'>Игры</span>
            {savedArticles.length > 2 && ' и '}
            {savedArticles.length > 2 && (
              <span className='news-header__tag'>
                {savedArticles.length - 2 === 1 ? '1-му другому' : '2-м другим'}
              </span>
            )}
          </p> */}
        </>
      )}

      {savedArticles.length > 4 && (
        <>
          <h2 className='news-header__info'>
            {currentUser.name}, у вас {savedArticles.length} сохранённых статей
          </h2>

          {/* <p className='news-header__tags'>
            По ключевым словам: <span className='news-header__tag'>Бои</span>,{' '}
            <span className='news-header__tag'>Игры</span> и{' '}
            <span className='news-header__tag'>2-м другим</span>
          </p> */}
        </>
      )}

      {keywords.length === 1 && (
        <p className='news-header__tags'>
          По ключевому слову: <span className='news-header__tag'>{keywords[0]}</span>
        </p>
      )}
      {keywords.length === 2 && (
        <p className='news-header__tags'>
          По ключевым словам: <span className='news-header__tag'>{keywords[0]}</span>
          {' и '}
          <span className='news-header__tag'>{keywords[1]}</span>
        </p>
      )}

      {keywords.length > 2 && (
        <p className='news-header__tags'>
          По ключевым словам: <span className='news-header__tag'>{keywords[0]}</span>
          {', '}
          <span className='news-header__tag'>{keywords[1]}</span>
          {' и '}
          {keywords.length === 3 ? (
            <span className='news-header__tag'>1-му другому</span>
          ) : (
            <span className='news-header__tag'>{keywords.length - 2}-м другим</span>
          )}
        </p>
      )}

      {/* <h2 className='news-header__info'>
        {currentUser.name}, у вас {savedArticles.length === 0 ? 'пока нет' : savedArticles.length}{' '}
        сохранённых статей
      </h2>
      <p className='news-header__tags'>
        По ключевым словам: <span className='news-header__tag'>Бои</span>,{' '}
        <span className='news-header__tag'>Игры</span> и{' '}
        <span className='news-header__tag'>2-м другим</span>
      </p> */}
    </section>
  );
}

export default SavedNewsHeader;
