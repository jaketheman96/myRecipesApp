import React, { useContext } from 'react';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/header/Header';
import RecipeDetailsFoods from './RecipeDetailsFoods';

function Recipes() {
  /* const nrDeReceitas = 12; */
  // const { mealsApi, loading } = useContext(RecipesContext);
  const { searchedData } = useContext(RecipesContext);
  console.log(searchedData);
  return (
    <>
      <Header />
      { searchedData.length === 1 ? <RecipeDetailsFoods /> : <h1>teste</h1>/* (
        <section>
          { searchedData.slice(0, nrDeReceitas).map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                width="20"
                height="20"
              />
            </div>
          )) }
        </section>
      ) */}
      {/* { loading ? <p>Loading</p> : (
        <section>
          { mealsApi.slice(0, nrDeReceitas).map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{ food.strMeal }</h1>
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                width="20"
                height="20"
              />
            </div>
          )) }
        </section>
      ) } */}
      <Footer />
    </>
  );
}

export default Recipes;
