import React from 'react';

function RecipeDetailsDrinks() {
  const { searchedData } = useContext(RecipesContext);
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

export default RecipeDetailsDrinks;
