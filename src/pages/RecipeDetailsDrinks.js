import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsDrinks({ match: { params: { id } } }) {
  const {
    setLoading,
  } = useContext(RecipesContext);

  const [drinkDetails, setDrinkDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState([]);

  useEffect(() => {
    const array = [];
    const size = 10;
    for (let i = 1; i <= size; i += 1) {
      array.push(i);
    }
    setArrayOfNum(array);
  }, []);

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
    <section>
      {drinkDetails
        ? drinkDetails.drinks.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
              width="200"
            />
            <h1 data-testid="recipe-title">{ element.strDrink }</h1>
            <h3 data-testid="recipe-category">{ element.strAlcoholic }</h3>
            <p data-testid="instructions">{ element.strInstructions }</p>
            <ul>
              { arrayOfNum && arrayOfNum.map((number, position) => (
                <div
                  key={ number }
                  data-testid={ `${position}-recomendation-card` }
                >
                  <li
                    data-testid={ `${position}-ingredient-name-and-measure` }
                  >
                    <p>
                      { `${element[`strIngredient${number}`]} 
                    ${element[`strMeasure${number}`]}` }
                    </p>
                  </li>
                </div>
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
