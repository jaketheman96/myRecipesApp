import React, { useContext } from 'react';
import CategoriaDrink from '../components/CategoriaDrink';
import CatergoriaFood from '../components/CategoriaFood';
import DrinkCard from '../components/DrinkCard';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <>
      <Header />
      {pathNames === 'Foods' ? <CatergoriaFood /> : <CategoriaDrink />}
      {pathNames === 'Foods' ? <FoodCard /> : <DrinkCard />}
      <Footer />
    </>
  );
}

export default Recipes;
