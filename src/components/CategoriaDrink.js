import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import DrinkCard from './DrinkCard';
import MainDrink from './MainDrink';

export default function CategoriaDrink() {
  const {
    drinkData,
    categoriaDrink,
    setCategoriaDrink,
    setResultCategoriaDrink,
    setCategoriaRender,
    categoriaRender,
    isSearching,
    setIsSearching,
  } = useContext(RecipesContext);

  async function fetchCategoria() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((raw) => raw.json());
  }

  async function fetchResultCategoria(cat) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then((raw) => raw.json())
      .then((data) => setResultCategoriaDrink(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchCategoria().then((data) => {
      setCategoriaDrink(data.drinks);
    });
  }, []);

  const categoriaButton = (cur) => {
    fetchResultCategoria(cur);
    setCategoriaRender(!categoriaRender);
  };

  useEffect(() => {
    const handleConditionalRender = () => {
      if (!categoriaRender) {
        setResultCategoriaDrink(drinkData);
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
          setResultCategoriaDrink(drinkData);
          setCategoriaRender(false);
        } }
      >
        All

      </button>
      <section>
        {categoriaDrink.slice(0, nrDeCategorias).map((drink, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${drink.strCategory}-category-filter` }
            onClick={ () => {
              categoriaButton(drink.strCategory);
              setIsSearching(false);
            } }
          >
            {drink.strCategory}

          </button>
        ))}
      </section>
      <section>
        {isSearching ? <DrinkCard /> : <MainDrink />}
      </section>
    </div>
  );
}
