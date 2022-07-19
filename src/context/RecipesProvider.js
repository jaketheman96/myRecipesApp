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
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [pathNames, setPathNames] = useState('');
  const { pathname } = useLocation();
  const [categoriaFood, setCategoriaFood] = useState([]);
  const [resultCategoriaFood, setResultCategoriaFood] = useState([]);
  const [categoriaDrink, setCategoriaDrink] = useState([]);
  const [resultCategoriaDrink, setResultCategoriaDrink] = useState([]);
  const [categoriaRender, setCategoriaRender] = useState(false);

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

  useEffect(() => {
    function fetchFoodsApi() {
      setLoading(true);
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      fetch(url)
        .then((response) => response.json())
        .then((datas) => {
          setFoodData(datas);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
    fetchFoodsApi();
  }, []);

  useEffect(() => {
    function fetchDrinksApi() {
      setLoading(true);
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetch(url)
        .then((response) => response.json())
        .then((datas) => {
          setDrinkData(datas);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
    fetchDrinksApi();
  }, []);

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
    foodData,
    setFoodData,
    drinkData,
    setDrinkData,
    categoriaFood,
    setCategoriaFood,
    categoriaDrink,
    setCategoriaDrink,
    resultCategoriaFood,
    setResultCategoriaFood,
    resultCategoriaDrink,
    setResultCategoriaDrink,
    categoriaRender,
    setCategoriaRender,
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
