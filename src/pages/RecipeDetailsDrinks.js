import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

const RECIPES = 6;
const copy = require('clipboard-copy');

function RecipeDetailsDrinks({ match: { url, params: { id } } }) {
  const {
    setLoading,
    foodData,
    setPathNames,
  } = useContext(RecipesContext);

  const [drinkDetails, setDrinkDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState(null);
  const [recomendations, setRecomendations] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setPathNames('Drinks');
  });

  useEffect(() => {
    const array = [];
    const size = 5;
    for (let i = 1; i <= size; i += 1) {
      array.push(i);
    }
    setArrayOfNum(array);
  }, []);

  useEffect(() => {
    const handleRecomendations = () => {
      if (foodData.length !== 0) {
        return foodData.meals.slice(0, RECIPES);
      }
    };
    setRecomendations(handleRecomendations());
  }, [foodData]);

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(urlApi)
        .then((response) => response.json())
        .then((data) => setDrinkDetails(data.drinks))
        .catch((error) => console.log(error));
    };
    fetchDrinkDetails();
    setLoading(false);
  }, []);

  const handleShareClick = () => {
    copy(`http://localhost:3000${url}`);
    setCopySuccess('Link copied!');
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

  const handleFavoriteClick = () => {
    const { drinks } = drinkDetails;
    let getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorited(!isFavorited);
    const array = [];
    let obj = {};
    drinks.forEach((element) => {
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

  return (
    <section
      style={ { backgroundColor: 'grey' } }
    >
      {drinkDetails && recomendations
        ? drinkDetails.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
              width="200"
            />
            <h1 data-testid="recipe-title">{element.strDrink}</h1>
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
            <Carousel>
              <p>Recomendacoes:</p>
              {recomendations.map((recomend, position) => (
                <Carousel.Item
                  key={ position }
                  data-testid={ `${position}-recomendation-card` }
                >
                  <img
                    src={ recomend.strMealThumb }
                    alt={ recomend.strMeal }
                    width="100"
                  />
                  <h1
                    data-testid={ `${position}-recomendation-title` }
                  >
                    { recomend.strMeal }
                  </h1>
                </Carousel.Item>
              ))}
            </Carousel>
            <h3 data-testid="recipe-category">{element.strAlcoholic}</h3>
            <p data-testid="instructions">{element.strInstructions}</p>
            <ul>
              {arrayOfNum && arrayOfNum.map((number, position) => (
                <li
                  key={ number }
                  data-testid={ `${position}-ingredient-name-and-measure` }
                >
                  <p>
                    {element[`strIngredient${number}`]}
                    {' '}
                    {!element[`strMeasure${number}`] ? ''
                      : element[`strMeasure${number}`]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
        : <p>Loading...</p>}
      <footer>
        <button type="button">
          <a href="/drinks">
            <i className="fas fa-arrow-left" />
            Back to recipes
          </a>
        </button>
        <button
          id="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed' } }
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          Start Recipe
        </button>
      </footer>
    </section>
  );
}

RecipeDetailsDrinks.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default RecipeDetailsDrinks;
