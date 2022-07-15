import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const nrDeReceitas = 12;
  const { mealsApi, loading } = useContext(RecipesContext);
  return (
    <header>
      { loading ? <p>Loading</p> : (
        <section>
          { mealsApi.slice(0, nrDeReceitas).map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                width="20"
                height="20"
              />
            </div>
          )) }
        </section>
      ) }
    </header>
  );
}

export default Recipes;
