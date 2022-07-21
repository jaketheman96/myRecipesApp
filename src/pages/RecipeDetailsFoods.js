import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsFoods({ match: { params: { id } } }) {
  const {
    setLoading,
  } = useContext(RecipesContext);

  const [foodDetails, setFoodDetails] = useState(null);
  const [arrayOfNum, setArrayOfNum] = useState([]);
  const [urlFood, setUrlFood] = useState('');
  // const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const array = [];
    const size = 10;
    for (let i = 1; i <= size; i += 1) {
      array.push(i);
    }
    setArrayOfNum(array);
  }, []);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setFoodDetails(data);
          setUrlFood(data.meals.map(({ strYoutube }) => (
            strYoutube.replace('watch?v=', 'embed/')
          )));
          // setIngredients(data.meals.filter((element, index) => (
          //   element[`strIngredient${index}`] !== null
          // )));
        })
        .catch((error) => console.log(error));
    };
    fetchFoodDetails();
    setLoading(false);
  }, []);

  return (
    <section>
      {foodDetails
        ? foodDetails.meals.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
              width="200"
              height="200"
            />
            <h1 data-testid="recipe-title">{ element.strMeal }</h1>
            <div>
              <iframe
                width="300"
                height="200"
                src={ urlFood && urlFood.map((video) => video) }
                title="Youtube Player"
                data-testid="video"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <p data-testid="recipe-category">{ `Categoria: ${element.strCategory}` }</p>
            <ul>
              { arrayOfNum && arrayOfNum.map((number, position) => (
                <li
                  key={ number }
                  data-testid={ `${position}-ingredient-name-and-measure` }
                >
                  <p>
                    { element[`strIngredient${number}`] }
                  </p>
                  <p>
                    { element[`strMeasure${number}`] }
                  </p>
                </li>))}
            </ul>
            <p data-testid="instructions">
              { `Instructions: ${element.strInstructions}` }
            </p>
          </div>
        ))
        : <p>Loading...</p>}
    </section>
  );
}

RecipeDetailsFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default RecipeDetailsFoods;
