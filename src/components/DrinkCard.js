import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinkCard() {
  const nrDeReceitas = 12;
  const { searchedData, drinkData: { drinks }, loading } = useContext(RecipesContext);

  const handleConditional = () => {
    if (loading) {
      return 'Loading';
    }
    return drinks;
  };

  return (
    <section>
      { !searchedData
        ? handleConditional().slice(0, nrDeReceitas).map((element, index) => (
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
        )) : (
          <div>
            { searchedData.drinks
           && searchedData.drinks.slice(0, nrDeReceitas).map((element, index) => (
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
           )) }
          </div>
        ) }
    </section>
  );
}
