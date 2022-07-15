import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const {
    searchType,
    setSearchType,
    setSearchedData,
    setLoading,
  } = useContext(RecipesContext);

  const [searchValue, setSearchValue] = useState('');

  const handleConditionalUrl = () => {
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
      return searchType;
    }
  };

  const fetchApi = async () => {
    setLoading(true);
    const fetching = await fetch(handleConditionalUrl());
    const response = await fetching.json();
    setSearchedData(response);
    setLoading(false);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchType(value);
  };

  return (
    <div>
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
        onClick={ () => fetchApi() }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
