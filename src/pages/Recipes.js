import React, { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import CategoriaDrink from '../components/CategoriaDrink';
import CategoriaFood from '../components/CategoriaFood';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <>
      <Header />
      {pathNames === 'Foods' ? <CategoriaFood /> : <CategoriaDrink />}
      {pathNames === 'Foods' ? <FoodCard /> : <DrinkCard />}
      <Footer />
    </>
  );
}

export default Recipes;
