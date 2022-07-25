import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import styles from '../styles/MainFood.module.css';

function MainFood() {
  const { resultCategoriaFood: { meals } } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <section className={ styles.foodCardPage }>
      { meals
          && meals.slice(0, nrDeReceitas).map((food, index) => (
            <Link
              to={ `/foods/${food.idMeal}` }
              key={ food.idMeal }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className={ styles.foodCard }
              >
                <h1
                  data-testid={ `${index}-card-name` }
                  className={ styles.foodCardName }
                >
                  { food.strMeal }
                </h1>
                <img
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  data-testid={ `${index}-card-img` }
                  width="50"
                  height="50"
                  className={ styles.foodCardimg }
                />
              </div>
            </Link>
          )) }
    </section>
  );
}

export default MainFood;
