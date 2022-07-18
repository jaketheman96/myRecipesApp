import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsFoods() {
  const { searchedData, loading } = useContext(RecipesContext);
  const { meals } = searchedData;

  return (
    <section>
      Recipe Details Food
      {!loading
        ? meals.map((element) => (
          <div key={ element.idMeal }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
              width="50"
              height="50"
            />
            <h1 data-testid="recipe-title">{ element.strMeal }</h1>
          </div>
        ))
        : <p>Loading...</p>}
    </section>
  );
}

export default RecipeDetailsFoods;
