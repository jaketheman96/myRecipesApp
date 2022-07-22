import React, { useContext } from 'react';
import CategoriaDrink from '../components/CategoriaDrink';
import CategoriaFood from '../components/CategoriaFood';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <>
      <Header />
      {pathNames === 'Foods' ? <CategoriaFood /> : <CategoriaDrink />}
      <Footer />
    </>
  );
}

export default Recipes;
