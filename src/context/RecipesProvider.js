import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [searchType, setSearchType] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchedData, setSearchedData] = useState(null);
  const [pathNames, setPathNames] = useState('');
  const { pathname } = useLocation();
  const [categoriaFood, setCategoriaFood] = useState([]);
  const [resultCategoriaFood, setResultCategoriaFood] = useState([]);
  const [categoriaDrink, setCategoriaDrink] = useState([]);

  useEffect(() => {
    const handlePathNames = () => {
      switch (pathname) {
      case '/foods':
        setPathNames('Foods');
        break;
      case '/drinks':
        setPathNames('Drinks');
        break;
      case '/profile':
        setPathNames('Profile');
        break;
      case '/done-recipes':
        setPathNames('Done Recipes');
        break;
      case '/favorite-recipes':
        setPathNames('Favorite Recipes');
        break;
      default:
      }
    };
    handlePathNames();
  });

  const STATE = {
    userEmail,
    setUserEmail,
    password,
    setPassword,
    disabled,
    setDisabled,
    loading,
    setLoading,
    searchType,
    setSearchType,
    searchedData,
    setSearchedData,
    showSearchBox,
    setShowSearchBox,
    pathNames,
    setPathNames,
    categoriaFood,
    setCategoriaFood,
    categoriaDrink,
    setCategoriaDrink,
    resultCategoriaFood,
    setResultCategoriaFood,
  };

  return (
    <RecipesContext.Provider value={ STATE }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
