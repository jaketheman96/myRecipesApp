import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import styles from './styles/SearchBar.module.css';

function SearchBar() {
  const {
    searchType,
    setSearchType,
    setLoading,
    pathNames,
    searchedData,
    setIsSearching,
    setSavingId,
    setSearchedData,
    resultCategoriaFood,
  } = useContext(RecipesContext);

  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const handleFoodFetch = () => {
    switch (searchType) {
    case 'ingredient':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
    case 'name':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    case 'first-letter':
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
      }
      break;
    default:
      break;
    }
  };

  const handleDrinkFetch = () => {
    switch (searchType) {
    case 'ingredient':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`;
    case 'name':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    case 'first-letter':
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`;
      }
      break;
    default:
      break;
    }
  };

  const handleToggleFetch = (param) => {
    if (param === 'Foods') {
      return handleFoodFetch();
    }
    if (param === 'Drinks') {
      return handleDrinkFetch();
    }
  };

  useEffect(() => {
    if (!searchedData) {
      return null;
    }
    const handleIsDrinkOrFood = () => {
      switch (pathNames) {
      case 'Foods':
        if (!searchedData.meals) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          setSearchedData(resultCategoriaFood);
          return 'error';
        }
        if (searchedData.meals.length === 1) {
          searchedData.meals.map(({ idMeal }) => {
            history.push(`/foods/${idMeal}`);
            return idMeal;
          });
        }
        break;
      case 'Drinks':
        if (!searchedData.drinks) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          return 'error';
        }
        if (searchedData.drinks.length === 1) {
          searchedData.drinks.map(({ idDrink }) => {
            setSavingId(idDrink);
            history.push(`/drinks/${idDrink}`);
            return idDrink;
          });
        }
        break;
      default:
      }
    };
    handleIsDrinkOrFood();
  }, [searchedData]);

  const fetchApiWhenClicked = async () => {
    setLoading(true);
    setIsSearching(true);
    await fetch(handleToggleFetch(pathNames))
      .then((response) => response.json())
      .then((element) => {
        setSearchedData(element);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchType(value);
  };

  return (
    <section className={ styles.searchBar }>
      <label htmlFor="search-bar">
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          data-testid="search-input"
          placeholder="Digite sua pesquisa"
          onChange={ (e) => setSearchValue(e.target.value) }
        />
      </label>
      <input
        type="radio"
        value="ingredient"
        name="search"
        data-testid="ingredient-search-radio"
        onChange={ handleChange }
      />
      Ingredient
      <input
        type="radio"
        value="name"
        name="search"
        data-testid="name-search-radio"
        onChange={ handleChange }
      />
      Name
      <input
        type="radio"
        value="first-letter"
        name="search"
        data-testid="first-letter-search-radio"
        onChange={ handleChange }
      />
      First Letter
      <button
        type="button"
        onClick={ fetchApiWhenClicked }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
