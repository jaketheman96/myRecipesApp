import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function DrinkCard() {
  const nrDeReceitas = 12;
  const { searchedData } = useContext(RecipesContext);

  return (
    <section>
      { searchedData && (
        <div>
          { searchedData.drinks
            && searchedData.drinks.slice(0, nrDeReceitas).map((element, index) => (
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
                    width="50"
                    height="50"
                  />
                </div>
              </Link>
            )) }
        </div>
      ) }
    </section>
  );
}
