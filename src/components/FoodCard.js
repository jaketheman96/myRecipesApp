import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FoodCard() {
  const nrDeReceitas = 12;
  const { searchedData } = useContext(RecipesContext);

  return (
    <section>
      { searchedData && (
        <div>
          { searchedData.meals
           && searchedData.meals.slice(0, nrDeReceitas).map((element, index) => (
             <div key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{ element.strMeal }</h1>
               <img
                 src={ element.strMealThumb }
                 alt={ element.strMeal }
                 data-testid={ `${index}-card-img` }
                 width="50"
                 height="50"
               />
             </div>
           )) }
        </div>
      ) }
    </section>
  );
}
