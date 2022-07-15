import React from 'react';

function SearchBar(props) {
  console.log(props);
  return (
    <div>
      <form>
        <label htmlFor="search-bar">
          <input
            type="text"
            name="search-bar"
            placeholder="Digite sua pesquisa"
          />
        </label>
        <label htmlFor="ingredient-search">
          Ingredient
          <input
            type="radio"
            name="ingredient-search"
            data-testid="ingredient-search-radio"
            value="ingredient"
          />
        </label>
        <label htmlFor="name-search">
          Name
          <input
            type="radio"
            name="name-search"
            data-testid="name-search-radio"
            value="name"
          />
        </label>
        <label htmlFor="first-letter-search">
          Primeira Letra
          <input
            type="radio"
            name="first-letter-search"
            data-testid="first-letter-radio"
            value="firs-letter"
          />
        </label>
        <button type="button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
