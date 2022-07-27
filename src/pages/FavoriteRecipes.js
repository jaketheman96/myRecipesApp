import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const initialFavoriteRecipes = JSON.parse(localStorage.favoriteRecipes);

  const [copySuccess, setCopySuccess] = useState('');
  const [favoriteAll, setFavoriteAll] = useState(initialFavoriteRecipes);

  const handleShareClick = (event) => {
    copy(`http://localhost:3000/${event.target.value}`);
    setCopySuccess('Link copied!');
  };

  const handFilterFood = () => {
    const initialFavoriteRecipes1 = JSON.parse(localStorage.favoriteRecipes);
    const foodFilter = initialFavoriteRecipes1.filter((r) => r.type !== 'drink');
    setFavoriteAll(foodFilter);
  };

  const handFilterDrink = () => {
    const initialFavoriteRecipes2 = JSON.parse(localStorage.favoriteRecipes);
    const drinkFilter = initialFavoriteRecipes2.filter((r) => r.type !== 'food');
    setFavoriteAll(drinkFilter);
  };

  const handFilterAll = () => {
    const initialFavoriteRecipes3 = JSON.parse(localStorage.favoriteRecipes);
    setFavoriteAll(initialFavoriteRecipes3);
  };

  const handleFavoriteClick = (event) => {
    const newFavorite = initialFavoriteRecipes.filter(
      (recipe) => recipe.id !== event.target.value,
    );
    localStorage.favoriteRecipes = JSON.stringify(newFavorite);
    setFavoriteAll(favoriteAll.filter((recipe) => recipe.id !== event.target.value));
  };

  return (
    <div>
      <Header />
      <h1>Favorite Recipes</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handFilterAll }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handFilterFood }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handFilterDrink }
      >
        Drink

      </button>
      { favoriteAll ? favoriteAll.map((element, index) => (
        <>
          <div>
            <input
              type="image"
              src={ shareIcon }
              alt="Share Button"
              name="share-btn"
              value={ `${element.type}s/${element.id}` }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleShareClick }
            />
            { copySuccess }
            <input
              type="image"
              src={ blackHeartIcon }
              alt="Favorite Button"
              value={ element.id }
              name="favorite-btn"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ handleFavoriteClick }
            />
          </div>
          <Link
            to={ `/${element.type}s/${element.id}` }
            key={ element.id }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>{element.name}</h3>
            <div key={ element.id } data-testid={ `${index}-horizontal-top-text` }>
              {element.type === 'food' ? (
                <p>
                  {element.nationality}
                  {' '}
                  -
                  {' '}
                  {element.category}
                </p>
              ) : (
                <p>
                  {element.alcoholicOrNot}
                </p>
              ) }
              <img
                src={ element.image }
                alt={ element.name }
                data-testid={ `${index}-horizontal-image` }
                width="50"
                height="50"
              />
            </div>
          </Link>

        </>
      )) : null }
    </div>
  );
}

export default FavoriteRecipes;
