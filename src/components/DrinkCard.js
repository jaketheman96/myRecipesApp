import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinkCard() {
  const nrDeReceitas = 12;
  const { drinksApi, loading } = useContext(RecipesContext);
  return (
    <header>
      { loading ? <p>Loading</p> : (
        <section>
          { drinksApi.slice(0, nrDeReceitas).map((food, index) => (
            <div key={ food.idDrink } data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{ food.strDrink }</h1>
              <img
                src={ food.strDrinkThumb }
                alt={ food.strDrink }
                data-testid={ `${index}-card-img` }
                width="50"
                height="50"
              />
            </div>
          )) }
        </section>
      ) }
    </header>
  );
}
