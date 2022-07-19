import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CatergoriaFood() {
  const {
    categoriaFood,
    setCategoriaFood,
    setResultCategoriaFood } = useContext(RecipesContext);

  async function fetchCategoria() {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((raw) => raw.json());
  }

  async function fetchResultCategoria(cat) {
    apiResult = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then((raw) => raw.json());
    return apiResult;
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
            onClick={ () => fetchResultCategoria(meal.strCategory) }
          >
            {meal.strCategory}

          </button>
        ))}
      </section>
      {/* <section>
        { searchedData.meals
           && searchedData.meals.slice(0, nrDeReceitas).map((food, index) => (
             <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
               <img
                 src={ food.strMealThumb }
                 alt={ food.strMeal }
                 data-testid={ `${index}-card-img` }
                 width="50"
                 height="50"
               />
             </div>
           )) }
      </section> */}
    </div>
  );
}
