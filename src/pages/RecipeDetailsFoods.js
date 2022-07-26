import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useRouteMatch } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import styles from '../styles/RecipeDetailsFoods.module.css';
import FooterButtons from '../components/FooterButtons';

const RECIPES = 6;

function RecipeDetailsFoods() {
  const {
    setLoading,
    drinkData,
    setPathNames,
  } = useContext(RecipesContext);

  const { url, params: { id } } = useRouteMatch();

  const [foodDetails, setFoodDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState([]);
  const [urlFood, setUrlFood] = useState('');
  const [recomendations, setRecomendations] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [ingredientLength, setIngredientLength] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState(null);

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
      }
    };
    handleNullKeys();
  }, [foodDetails]);

  useEffect(() => {
    const handleFilterIng = () => {
      if (filteredDetails) {
        setIngredientLength(filteredDetails.map((e) => Object.keys(e).filter((key) => (
          key.includes('strIngredient') || key.includes('strMeasure')
        ))));
      }
    };
    handleFilterIng();
  }, [filteredDetails]);

  useEffect(() => {
    setPathNames('Foods');
  });

  useEffect(() => {
    const handleRecomendations = () => {
      if (drinkData.length !== 0) {
        return drinkData.drinks.slice(0, RECIPES);
      }
    };
    setRecomendations(handleRecomendations());
  }, [drinkData]);

  useEffect(() => {
    const handleIngredientLength = () => {
      if (ingredientLength.length) {
        const array = [];
        const size = ingredientLength[0].length / 2;
        for (let i = 1; i <= size; i += 1) {
          array.push(i);
        }
        setArrayOfNum(array);
      }
    };
    handleIngredientLength();
  }, [ingredientLength]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(urlApi)
        .then((response) => response.json())
        .then(({ meals }) => {
          setFoodDetails(meals);
          setUrlFood(meals.map(({ strYoutube }) => (
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
    <section className={ styles.recipesPage }>
      {foodDetails && recomendations
        ? foodDetails.map((element, index) => (
          <div key={ index } className={ styles.recipesPageDrink }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
              className={ styles.recipesPageDrinkImg }
            />
            <div className={ styles.recipesPageDrinkDiv }>
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
            <h1 data-testid="recipe-title" className={ styles.recipesPageDrinkName }>
              { element.strMeal }
            </h1>
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
                  <h1 data-testid={ `${position}-recomendation-title` }>
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
              <p data-testid="recipe-category" className={ styles.categoria }>
                { `Categoria: ${element.strCategory}` }
              </p>
              <p data-testid="instructions" className={ styles.categoria }>
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
      <FooterButtons />
    </section>
  );
}

export default RecipeDetailsFoods;
