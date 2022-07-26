import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';

function DoneRecipes() {
  const [infosOfStorage, setInfosOfStorage] = useState([]);

  useEffect(() => {
    const getInfosOfStorage = () => {
      const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
      if (getItem) {
        setInfosOfStorage(getItem.map((item) => item));
      }
    };
    getInfosOfStorage();
  }, []);

  return (
    <>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {infosOfStorage.length ? infosOfStorage.map((info, index) => (
        <div key={ index }>
          <img
            src={ info.img }
            alt={ info.name }
            data-testid={ `${index}-horizontal-image` }
            width="150"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `Category: ${info.category}` }
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {info.name}
          </h3>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {info.date}
          </p>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            Share
          </button>
          {info.tags.length ? info.tags.map((tag, position) => (
            <li
              key={ position }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </li>
          )) : null}
        </div>
      )) : null}
    </>
  );
}

export default DoneRecipes;
