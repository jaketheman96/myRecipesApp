import React, { useContext, useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function FoodInProgress() {
  const { setLoading } = useContext(RecipesContext);

  const [foodDetails, setFoodDetails] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [arrayOfNum, setArrayOfNum] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState(null);

  const { url, params: { id } } = useRouteMatch();

  useEffect(() => {
    const array = [];
    const size = 15;
    for (let i = 1; i <= size; i += 1) {
      array.push(i);
    }
    setArrayOfNum(array);
  }, []);

  useEffect(() => {
    const handleNullKeys = () => {
      if (foodDetails) {
        const filtered = foodDetails.map((element) => {
          Object.keys(element).forEach((key) => {
            if (!element[key] || element[key] === ' ') {
              delete element[key];
            }
          });
          return element;
        });
        setFilteredDetails(filtered);
        const entries = Object.entries(filtered);
        console.log(Object.fromEntries(entries));
      }
    };
    handleNullKeys();
  }, [foodDetails]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(urlApi)
        .then((response) => response.json())
        .then(({ meals }) => {
          setFoodDetails(meals);
        })
        .catch((error) => console.log(error));
    };
    fetchFoodDetails();
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
        id: element.idMeal,
        type: 'food',
        nationality: element.strArea,
        category: element.strCategory,
        alcoholicOrNot: '',
        name: element.strMeal,
        image: element.strMealThumb,
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
      { filteredDetails && filteredDetails.map((food, index) => (
        <div key={ index }>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
            width="200"
            height="200"
          />
          <h1 data-testid="recipe-title">{ food.strMeal }</h1>
          <p data-testid="recipe-category">{ `Categoria: ${food.strCategory}` }</p>
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
          {/* <p>{Object.entries(food)}</p> */}
          <p data-testid="instructions">
            { `Instructions: ${food.strInstructions}` }
          </p>
          {/* { arrayOfNum && arrayOfNum.map((number, position) => (
            <li
              key={ number }
              data-testid={ `${position}-ingredient-step` }
            >
              { `${food[`strIngredient${number}`]} ${food[`strMeasure${number}`]}` }
            </li>
          ))} */}
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

export default FoodInProgress;
