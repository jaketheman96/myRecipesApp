import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import RecipesContext from '../context/RecipesContext';

const RECIPES = 6;

function RecipeDetailsDrinks({ match: { params: { id } } }) {
  const {
    setLoading,
    foodData,
  } = useContext(RecipesContext);

  const [drinkDetails, setDrinkDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState(null);
  const [recomendations, setRecomendations] = useState(null);

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
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setDrinkDetails(data))
        .catch((error) => console.log(error));
    };
    fetchDrinkDetails();
    setLoading(false);
  }, []);

  return (
    <section
      style={ { backgroundColor: 'grey' } }
    >
      {drinkDetails && recomendations
        ? drinkDetails.drinks.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
              width="200"
            />
            <h1 data-testid="recipe-title">{element.strDrink}</h1>
            <p>Recomendacoes:</p>
            <Carousel>
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
    </section>
  );
}

RecipeDetailsDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default RecipeDetailsDrinks;
