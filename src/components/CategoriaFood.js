import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CatergoriaFood() {
  const {
    categoriaFood,
    resultCategoriaFood,
    setCategoriaFood,
    setResultCategoriaFood,
    setCategoriaRender } = useContext(RecipesContext);

  async function fetchCategoria() {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((raw) => raw.json());
  }

  async function fetchResultCategoria(cat) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then((raw) => raw.json())
      .then((data) => setResultCategoriaFood(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchCategoria().then((data) => {
      setCategoriaFood(data.meals);
    });
  }, []);

  const categoriaButton = (cur) => {
    fetchResultCategoria(cur);
    setCategoriaRender(true);
  };

  const nrDeCategorias = 5;
  const nrDeReceitas = 12;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCategoriaRender(false) }
      >
        All

      </button>
      <section>
        {categoriaFood.slice(0, nrDeCategorias).map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => { categoriaButton(meal.strCategory); } }
          >
            {meal.strCategory}

          </button>
        ))}
      </section>
      <section>
        { resultCategoriaFood.meals
           && resultCategoriaFood.meals.slice(0, nrDeReceitas).map((food, index) => (
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
      </section>
    </div>
  );
}
