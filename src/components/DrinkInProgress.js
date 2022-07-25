import React, { useContext, useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function DrinkInProgress() {
  const { setLoading } = useContext(RecipesContext);

  const [drinkDetails, setDrinkDetails] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [filteredDetails, setFilteredDetails] = useState(null);

  const { url, params: { id } } = useRouteMatch();

  useEffect(() => {
    const handleNullKeys = () => {
      if (drinkDetails) {
        const filtered = drinkDetails.map((element) => {
          Object.keys(element).forEach((key) => {
            if (!element[key] || element[key] === ' ') {
              delete element[key];
            }
          });
          return element;
        });
        setFilteredDetails(filtered);
      }
    };
    handleNullKeys();
  }, [drinkDetails]);

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(urlApi)
        .then((response) => response.json())
        .then(({ drinks }) => {
          setDrinkDetails(drinks);
        })
        .catch((error) => console.log(error));
    };
    fetchDrinkDetails();
    setLoading(false);
  }, []);

  const handleShareClick = () => {
    clipboardCopy(`http://localhost:3000${url}`);
    setCopySuccess('Link copied!');
  };

  const handleFavoriteClick = () => {
    let getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorited(!isFavorited);
    const array = [];
    let obj = {};
    foodDetails.forEach((element) => {
      obj = {
        id: element.idDrink,
        type: 'drink',
        nationality: '',
        category: element.strCategory,
        alcoholicOrNot: element.strAlcoholic,
        name: element.strDrink,
        image: element.strDrinkThumb,
      };
    });
    if (!getItem) {
      array.push(obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    }
    if (getItem) {
      const condition = getItem.some((item) => item.id === id);
      if (!condition) {
        localStorage.favoriteRecipes = JSON.stringify(getItem.concat(obj));
      }
      if (condition) {
        getItem = getItem.filter((itens) => itens.id !== id);
        localStorage.favoriteRecipes = JSON.stringify(getItem);
      }
    }
  };

  useEffect(() => {
    const handleConditional = () => {
      const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (getStorage && getStorage.some((item) => item.id === id)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    };
    handleConditional();
  }, []);

  return (
    <div>
      { filteredDetails && filteredDetails.map((drink, index) => (
        <div key={ index }>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
            width="200"
            height="200"
          />
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <p data-testid="recipe-category">{ `Categoria: ${drink.strCategory}` }</p>
          <div
            style={ {
              display: 'flex',
              justifyContent: 'space-around',
            } }
          >
            <input
              type="image"
              src={ shareIcon }
              alt="Share Button"
              name="share-btn"
              data-testid="share-btn"
              onClick={ handleShareClick }
            />
            { copySuccess }
            <input
              type="image"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Button"
              name="favorite-btn"
              data-testid="favorite-btn"
              onClick={ handleFavoriteClick }
            />
          </div>
          <p data-testid="instructions">
            { `Instructions: ${drink.strInstructions}` }
          </p>
          {Object.keys(drink).map((key, position) => {
            if (key.includes('strIngredient')) {
              return (
                <div
                  style={ { display: 'flex', flexDirection: 'column' } }
                  key={ position }
                  data-testid={ `${position}-ingredient-step` }
                >
                  <label htmlFor={ `ingredient${position}` }>
                    <input
                      type="checkbox"
                      id={ `ingredient${position}` }
                      key={ position }
                    />
                    {drink[key]}
                  </label>
                </div>
              );
            }
            return null;
          })}
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default DrinkInProgress;
