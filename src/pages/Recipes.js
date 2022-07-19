import React, { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import CategoriaDrink from '../components/CategoriaDrink';
import CatergoriaFood from '../components/CategoriaFood';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import MainDrink from '../components/MainDrink';
import MainFood from '../components/MainFood';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { pathNames,
    searchedData,
  } = useContext(RecipesContext);

  return (
    <>
      <Header />
      {pathNames === 'Foods' ? <CatergoriaFood /> : <CategoriaDrink />}
      {pathNames === 'Foods' ? <FoodCard /> : <DrinkCard />}
      {pathNames === 'Foods' && !searchedData ? <MainFood /> : <MainDrink /> }
      <Footer />
    </>
  );
}

export default Recipes;
