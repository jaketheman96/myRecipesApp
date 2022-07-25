import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import styles from '../styles/FoodCard.module.css';

export default function FoodCard() {
  const nrDeReceitas = 12;
  const { searchedData } = useContext(RecipesContext);

  return (
    <section className={ styles.foodCardPage }>
      { searchedData && (
        <div className="teste">
          { searchedData.meals
            && searchedData.meals.slice(0, nrDeReceitas).map((element, index) => (
              <Link
                to={ `/foods/${element.idMeal}` }
                key={ element.idMeal }
              >
                <div key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
                  <h1 data-testid={ `${index}-card-name` }>{ element.strMeal }</h1>
                  <img
                    src={ element.strMealThumb }
                    alt={ element.strMeal }
                    data-testid={ `${index}-card-img` }
                    width="50"
                    height="50"
                  />
                </div>
              </Link>
            ))}
        </div>
      ) }
    </section>
  );
}
