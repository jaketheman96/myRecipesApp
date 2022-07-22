import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function MainDrink() {
  const { resultCategoriaDrink: { drinks } } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <div>
      {drinks && drinks.slice(0, nrDeReceitas).map((element, index) => (
        <Link
          to={ `/drinks/${element.idDrink}` }
          key={ element.idDrink }
        >
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
        </Link>
      ))}
    </div>
  );
}

export default MainDrink;
