import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function MainFood() {
  const { foodData: { meals } } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <div>
      {meals && meals.slice(0, nrDeReceitas).map((element, index) => (
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
  );
}

export default MainFood;
