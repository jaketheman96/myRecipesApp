import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsFoods() {
  const { searchedData } = useContext(RecipesContext);
  

  /*  cont test = {} */
  console.log(searchedData);
  return (
    <div>
      <section>
        <div>
          <img
            src={ searchedData.strMealThumb }
            alt={ searchedData.strMeal }
            data-testid="recipe-photo"
            width="50"
            height="50"
          />
          <h1 data-testid="recipe-title">{ searchedData.strMeal }</h1>
        </div>
      </section>
    </div>
  );
}

export default RecipeDetailsFoods;
