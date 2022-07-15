import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [mealsApi, setMealsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);

  useEffect(() => {
    const fetchApiMeals = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const fetching = await fetch(url);
      const response = await fetching.json();
      setMealsApi(response);
    };
    const fetchApiDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const fetching = await fetch(url);
      const response = await fetching.json();
      setDrinksApi(response);
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
