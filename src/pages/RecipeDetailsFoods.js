import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import styles from '../styles/RecipeDetailsFoods.module.css';

const RECIPES = 6;

function RecipeDetailsFoods({ match: { url, params: { id } } }) {
  const {
    setLoading,
    drinkData,
    setShowBlackButton,
    showBlackButton,
  } = useContext(RecipesContext);

  const [foodDetails, setFoodDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState([]);
  const [urlFood, setUrlFood] = useState('');
  const [recomendations, setRecomendations] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const history = useHistory();

  useEffect(() => {
    const handleRecomendations = () => {
      if (drinkData.length !== 0) {
        return drinkData.drinks.slice(0, RECIPES);
      }
    };
    setRecomendations(handleRecomendations());
  }, [drinkData]);

  useEffect(() => {
    const array = [];
    const size = 15;
    for (let i = 1; i <= size; i += 1) {
      array.push(i);
    }
    setArrayOfNum(array);
  }, []);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(urlApi)
        .then((response) => response.json())
        .then((data) => {
          setFoodDetails(data);
          setUrlFood(data.meals.map(({ strYoutube }) => (
            strYoutube.replace('watch?v=', 'embed/')
          )));
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
    const { meals } = foodDetails;
    let getItem = localStorage.getItem('favoriteRecipes');
    setShowBlackButton(true);
    const array = [];
    meals.forEach((element) => {
      const obj = {
        id: element.idMeal,
        type: 'food',
        nationality: element.strArea,
        category: element.strCategory,
        alcoholicOrNot: '',
        name: element.strMeal,
        image: element.strMealThumb,
      };
      if (!getItem) {
        array.push(obj);
        localStorage.setItem('favoriteRecipes', JSON.stringify(array));
      } else {
        getItem = JSON.parse(getItem);
        localStorage.setItem('favoriteRecipes', JSON.stringify(getItem.concat(obj)));
      }
    });
  };

  useEffect(() => {
    const handleConditional = () => {
      const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (getStorage && getStorage.some((item) => item.id === id)) {
        setShowBlackButton(true);
      } else {
        setShowBlackButton(false);
      }
    };
    handleConditional();
  }, []);

  return (
    <section
      className={ styles.recipesPage }
    >
      {foodDetails && recomendations
        ? foodDetails.meals.map((element, index) => (
          <div key={ index } className={ styles.recipesPageDrink }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
              className={ styles.recipesPageDrinkImg }
            />
            <div
              className={ styles.recipesPageDrinkDiv }
            >
              <h1
                data-testid="recipe-title"
                className={ styles.recipesPageDrinkName }
              >
                { element.strMeal }
              </h1>
              <div className={ styles.recipesPageDrinkDiv2 }>
                <input
                  type="image"
                  src={ shareIcon }
                  alt="Share Button"
                  name="share-btn"
                  data-testid="share-btn"
                  onClick={ handleShareClick }
                  className={ styles.input1 }
                />
                { copySuccess }
                <input
                  type="image"
                  src={ showBlackButton ? blackHeartIcon : whiteHeartIcon }
                  alt="Favorite Button"
                  name="favorite-btn"
                  data-testid="favorite-btn"
                  onClick={ handleFavoriteClick }
                  className={ styles.input2 }
                />
              </div>
            </div>
            <Carousel>
              <p className={ styles.recomendation }>Recomendacoes:</p>
              {recomendations.map((recomend, position) => (
                <Carousel.Item
                  key={ position }
                  data-testid={ `${position}-recomendation-card` }
                  className={ styles.carousel }
                >
                  <img
                    src={ recomend.strDrinkThumb }
                    alt={ recomend.strDrink }
                    width="100"
                  />
                  <h1
                    data-testid={ `${position}-recomendation-title` }
                  >
                    { recomend.strDrink }
                  </h1>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className={ styles.ingredients }>
              <iframe
                width="300"
                height="200"
                src={ urlFood }
                title="Youtube Player"
                data-testid="video"
                frameBorder="0"
                allowFullScreen
                className={ styles.video }
              />
            </div>
            <div className={ styles.categorias }>
              <p
                data-testid="recipe-category"
                className={ styles.categoria }
              >
                { `Categoria: ${element.strCategory}` }
              </p>
              <p
                data-testid="instructions"
                className={ styles.categoria }
              >
                { `Instructions: ${element.strInstructions}` }
              </p>
              <ul>
                { arrayOfNum && arrayOfNum.map((number, position) => (
                  <li
                    key={ number }
                    data-testid={ `${position}-ingredient-name-and-measure` }
                  >
                    <p>
                      { `${element[`strIngredient${number}`]} 
                        ${element[`strMeasure${number}`]}` }
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
        : <p>Loading...</p>}
      <footer>
        <button type="button" className={ styles.footerButton1 }>
          <a href="/foods">
            <i className="fas fa-arrow-left" />
            Back to recipes
          </a>
        </button>
        <button
          className={ styles.footerButton1 }
          id="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed' } }
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          Start Recipe
        </button>
      </footer>
    </section>
  );
}

RecipeDetailsFoods.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default RecipeDetailsFoods;
