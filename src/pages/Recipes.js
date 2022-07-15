import React from 'react';
import dataProvistorio from '../dateProvisorio';

function Recipes() {
  console.log(dataProvistorio);
  const nrDeReceitas = 12;
  return (
    <header>
      { dataProvistorio.slice(0, nrDeReceitas).map((food, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h1>{ food.strMeal }</h1>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      )) }

    </header>
  );
}

export default Recipes;
