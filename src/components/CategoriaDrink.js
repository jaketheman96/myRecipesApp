import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function CategoriaDrink() {
  const {
    drinkData,
    categoriaDrink,
    setCategoriaDrink,
    resultCategoriaDrink,
    setResultCategoriaDrink,
    setCategoriaRender,
    categoriaRender,
    setSavingId,
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
  const nrDeReceitas = 12;
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
            onClick={ () => { categoriaButton(drink.strCategory); } }
          >
            {drink.strCategory}

          </button>
        ))}
      </section>
      <section>
        { resultCategoriaDrink.drinks
           && resultCategoriaDrink.drinks.slice(0, nrDeReceitas).map((drink, index) => (
             <Link
               to={ `/drinks/${drink.idDrink}` }
               key={ drink.idDrink }
               onClick={ () => setSavingId(drink.idDrink) }
             >
               <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
                 <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
                 <img
                   src={ drink.strDrinkThumb }
                   alt={ drink.strDrink }
                   data-testid={ `${index}-card-img` }
                   width="50"
                   height="50"
                 />
               </div>
             </Link>
           )) }
      </section>
    </div>
  );
}
