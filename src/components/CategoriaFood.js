import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CatergoriaFood() {
  const { categoriaFood, setCategoriaFood } = useContext(RecipesContext);

  async function fetchCategoria() {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((raw) => raw.json());
  }

  useEffect(() => {
    fetchCategoria().then((data) => {
      setCategoriaFood(data.meals);
    });
  }, []);

  const nrDeReceitas = 5;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
      >
        All

      </button>
      <section>
        {categoriaFood.slice(0, nrDeReceitas).map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
          /* onClick={} */
          >
            {meal.strCategory}

          </button>
        ))}
      </section>
    </div>
  );
}
