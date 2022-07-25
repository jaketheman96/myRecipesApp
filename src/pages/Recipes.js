import React, { useContext } from 'react';
import CategoriaDrink from '../components/CategoriaDrink';
import CategoriaFood from '../components/CategoriaFood';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import RecipesContext from '../context/RecipesContext';
import styles from '../styles/Recipes.module.css';

function Recipes() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <div className={ styles.recipesPage }>
      <Header />
      {pathNames === 'Foods' ? <CategoriaFood /> : <CategoriaDrink />}
      <Footer />
    </div>
  );
}

export default Recipes;
