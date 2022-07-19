import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsFoods() {
  const { searchedData, loading } = useContext(RecipesContext);

  return (
    <section>
      Recipe Details Food
      {!loading
        ? searchedData.meals.map((element, index) => (
          <div key={ index }>
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
