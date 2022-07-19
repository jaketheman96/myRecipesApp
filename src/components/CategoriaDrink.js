import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CategoriaDrink() {
  const { categoriaDrink, setCategoriaDrink } = useContext(RecipesContext);

  async function fetchCategoria() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((raw) => raw.json());
  }

  useEffect(() => {
    fetchCategoria().then((data) => {
      setCategoriaDrink(data.drinks);
    });
  }, []);

  const nrDeReceitas = 5;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        /* onClick={} */
      >
        All

      </button>
      <section>
        {categoriaDrink.slice(0, nrDeReceitas).map((drink, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${drink.strCategory}-category-filter` }
          /* onClick={} */
          >
            {drink.strCategory}

          </button>
        ))}
      </section>
    </div>
  );
}
