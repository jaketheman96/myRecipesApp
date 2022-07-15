import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [mealsApi, setMealsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const fetchApiMeals = async () => {
      setLoading(true);
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const fetching = await fetch(url);
      const response = await fetching.json();
      setMealsApi(response.meals);
      setLoading(false);
    };

    const fetchApiDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const fetching = await fetch(url);
      const response = await fetching.json();
      setDrinksApi(response.drinks);
    };
    fetchApiMeals();
    fetchApiDrinks();
  }, []);

  const STATE = {
    userEmail,
    setUserEmail,
    password,
    setPassword,
    disabled,
    setDisabled,
    mealsApi,
    drinksApi,
    loading,
    setLoading,
    searchType,
    setSearchType,
    searchedData,
    setSearchedData,
    showSearchBox,
    setShowSearchBox,
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
