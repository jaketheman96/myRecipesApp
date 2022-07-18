import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsDrinks() {
  const { searchedData, loading } = useContext(RecipesContext);
  const { drinks } = searchedData;

  return (
    <section>
      Recipe details Drinks
      {!loading
        ? drinks.map((element) => (
          <div key={ element.idDrink }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
              width="50"
              height="50"
            />
            <h1 data-testid="recipe-title">{ element.strDrink }</h1>
          </div>
        ))
        : <p>Loading...</p>}
    </section>
  );
}

export default RecipeDetailsDrinks;
