import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DrinkInProgress from '../components/DrinkInProgress';
import FoodInProgress from '../components/FoodInProgress';

function RecipeInProgress() {
  const { url } = useRouteMatch();

  return (
    <section>
      {url.includes('foods')
        ? <FoodInProgress /> : <DrinkInProgress />}
    </section>
  );
}

export default RecipeInProgress;
