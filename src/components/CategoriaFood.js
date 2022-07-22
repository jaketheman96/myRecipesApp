import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import FoodCard from './FoodCard';
import MainFood from './MainFood';

export default function CategoriaFood() {
  const {
    foodData,
    categoriaFood,
    setIsSearching,
    setCategoriaFood,
    setResultCategoriaFood,
    categoriaRender,
    setCategoriaRender,
    isSearching,
  } = useContext(RecipesContext);

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
    setCategoriaRender(!categoriaRender);
  };

  useEffect(() => {
    const handleConditionalRender = () => {
      if (!categoriaRender) {
        setResultCategoriaFood(foodData);
      }
    };
    handleConditionalRender();
  });

  const nrDeCategorias = 5;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          setResultCategoriaFood(foodData);
          setCategoriaRender(false);
        } }
      >
        All

      </button>
      <section>
        {categoriaFood.slice(0, nrDeCategorias).map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => {
              categoriaButton(meal.strCategory);
              setIsSearching(false);
            } }
          >
            {meal.strCategory}

          </button>
        ))}
      </section>
      {isSearching ? <FoodCard /> : <MainFood />}
    </div>
  );
}
