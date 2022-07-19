import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FoodCard() {
  const nrDeReceitas = 12;
  const { searchedData } = useContext(RecipesContext);
  return (
    <div>
      { searchedData && (
        <section>
          { searchedData.meals
           && searchedData.meals.slice(0, nrDeReceitas).map((food, index) => (
             <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
               <img
                 src={ food.strMealThumb }
                 alt={ food.strMeal }
                 data-testid={ `${index}-card-img` }
                 width="50"
                 height="50"
               />
             </div>
           )) }
        </section>
      ) }
    </div>
  );
}
