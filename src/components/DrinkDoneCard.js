import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DrinkDoneCard({ cardIndex }) {
  const [infosOfStorage, setInfosOfStorage] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const getInfosOfStorage = () => {
      const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
      if (getItem) {
        setInfosOfStorage(getItem.filter((item) => item.type === 'drink'));
      }
    };
    getInfosOfStorage();
  }, []);

  return (
    <div>
      {infosOfStorage.length ? infosOfStorage.map((info) => (
        <div key={ cardIndex }>
          <Link to={ `/drinks/${info.id}` }>
            <img
              src={ info.image }
              alt={ info.name }
              data-testid={ `${cardIndex}-horizontal-image` }
              width="150"
            />
            <h3 data-testid={ `${cardIndex}-horizontal-name` }>
              {info.name}
            </h3>
          </Link>
          <p data-testid={ `${cardIndex}-horizontal-done-date` }>
            {info.doneDate}
          </p>
          <p data-testid={ `${cardIndex}-horizontal-top-text` }>
            {info.alcoholicOrNot}
          </p>
          <input
            type="image"
            src={ shareIcon }
            alt="Share Icon"
            data-testid={ `${cardIndex}-horizontal-share-btn` }
            onClick={ () => {
              clipboardCopy(`http://localhost:3000/drinks/${info.id}`);
              setCopySuccess('Link copied!');
            } }
          />
          {copySuccess}
          {info.tags.length ? info.tags.map((tag, position) => (
            <li
              key={ position }
              data-testid={ `${cardIndex}-${tag}-horizontal-tag` }
            >
              {tag}
            </li>
          )) : null}
        </div>
      )) : null}
    </div>
  );
}

DrinkDoneCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
};

export default DrinkDoneCard;
