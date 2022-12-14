import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory, useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/CheckboxLineThrough.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const current = new Date();
const today = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
const array = [];
let obj = {};

function FoodInProgress() {
  const [foodDetails, setFoodDetails] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [filteredDetails, setFilteredDetails] = useState(null);
  const [ingredientLength, setIngredientLength] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { params: { id } } = useRouteMatch();
  const history = useHistory();

  const handleClick = () => {
    history.push('/done-recipes');
    localStorage.removeItem('inProgressRecipes');
    const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
    foodDetails.forEach((e) => {
      obj = {
        id: e.idMeal,
        type: 'food',
        image: e.strMealThumb,
        nationality: e.strArea,
        category: e.strCategory,
        alcoholicOrNot: '',
        name: e.strMeal,
        doneDate: today,
        tags: e.strTags ? e.strTags.split(',') : [],
      };
    });
    if (!getItem) {
      array.push(obj);
      localStorage.setItem('doneRecipes', JSON.stringify(array));
    }
    if (getItem) localStorage.doneRecipes = JSON.stringify(getItem.concat(obj));
  };

  useEffect(() => {
    const handleDisable = () => {
      if (checkedState) {
        setIsButtonDisabled(!checkedState.every((element) => element === true));
      }
    };
    handleDisable();
  }, [checkedState]);

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const handleStorageChecked = () => {
      if (!getItem && ingredientLength.length) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(
          new Array(ingredientLength[0].length).fill(false),
        ));
        setCheckedState(new Array(ingredientLength[0].length).fill(false));
      }
      if (getItem) setCheckedState(getItem);
    };
    handleStorageChecked();
  }, [ingredientLength]);

  const handleChange = (position) => {
    const updatedCheckedState = checkedState.map((element, index) => (
      index === position ? !element : element
    ));
    setCheckedState(updatedCheckedState);
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCheckedState));
  };

  useEffect(() => {
    if (filteredDetails && ingredientLength.length) {
      const filteringIng = ingredientLength[0].map((ingredient) => (
        filteredDetails.map((e) => e[ingredient])
      ));
      setIngredients(filteringIng);
    }
  }, [filteredDetails, ingredientLength]);

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
    const handleFilterIngredient = () => {
      if (filteredDetails) {
        setIngredientLength(filteredDetails.map((e) => Object.keys(e).filter((key) => (
          key.includes('strIngredient')
        ))));
      }
    };
    handleFilterIngredient();
  }, [filteredDetails]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetch(urlApi).then((response) => response.json())
        .then(({ meals }) => setFoodDetails(meals))
        .catch((error) => console.log(error));
    };
    fetchFoodDetails();
  }, []);

  const handleFavoriteClick = () => {
    let getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorited(!isFavorited);
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
      if (!condition) localStorage.favoriteRecipes = JSON.stringify(getItem.concat(obj));
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
      } else setIsFavorited(false);
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
              onClick={ () => {
                clipboardCopy(`http://localhost:3000/foods/${id}`);
                setCopySuccess('Link copied!');
              } }
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
          {ingredients && ingredients.map((element, position) => (
            element.map((item) => (
              <div
                style={ {
                  display: 'flex',
                  flexDirection: 'column',
                } }
                key={ position }
                data-testid={ `${position}-ingredient-step` }
              >
                <label
                  htmlFor={ `ingredient${position}` }
                  className={ checkedState[position] ? 'linethrough' : null }
                >
                  <input
                    type="checkbox"
                    id={ `ingredient${position}` }
                    name={ item }
                    value={ item }
                    checked={ checkedState[position] }
                    onChange={ () => handleChange(position) }
                  />
                  {item}
                </label>
              </div>
            ))
          ))}
          <p data-testid="instructions">
            { `Instructions: ${food.strInstructions}` }
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isButtonDisabled }
            onClick={ handleClick }
          >
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default FoodInProgress;
