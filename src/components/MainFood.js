import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function MainFood() {
  const { resultCategoriaFood: { meals } } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <section className="filter-by-button">
      { meals
          && meals.slice(0, nrDeReceitas).map((food, index) => (
            <Link
              to={ `/foods/${food.idMeal}` }
              key={ food.idMeal }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
                <img
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  data-testid={ `${index}-card-img` }
                  width="50"
                  height="50"
                />
              </div>
            </Link>
          )) }
    </section>
  );
}

export default MainFood;
