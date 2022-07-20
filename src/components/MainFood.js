import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function MainFood() {
  const { foodData: { meals }, setSavingId } = useContext(RecipesContext);
  const nrDeReceitas = 12;

  return (
    <div>
      {meals && meals.slice(0, nrDeReceitas).map((element, index) => (
        <Link
          to={ `/foods/${element.idMeal}` }
          key={ element.idMeal }
          onClick={ () => setSavingId(element.idMeal) }

        >
          <div key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
            <h1 data-testid={ `${index}-card-name` }>{ element.strMeal }</h1>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid={ `${index}-card-img` }
              width="80"
              height="80"
            />
          </div>
        </Link>
      )) }
    </div>
  );
}

export default MainFood;
