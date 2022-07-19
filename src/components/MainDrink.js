import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function MainDrink() {
  const { drinkData: { drinks } } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <div>
      {drinks && drinks.slice(0, nrDeReceitas).map((element, index) => (
        <div key={ element.idDrink } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{ element.strDrink }</h1>
          <img
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
            data-testid={ `${index}-card-img` }
            width="80"
            height="80"
          />
        </div>
      ))}
    </div>
  );
}

export default MainDrink;
