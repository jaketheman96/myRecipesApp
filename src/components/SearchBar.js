import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-bar">
        <input
          type="text"
          name="search-bar"
          placeholder="Digite sua pesquisa"
        />
      </label>
      <br />
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          type="radio"
          name="ingredient-search"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          name="name-search"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search">
        Primeira Letra
        <input
          type="radio"
          name="first-letter-search"
          data-testid="first-letter-radio"
        />
      </label>
      <button type="button">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
