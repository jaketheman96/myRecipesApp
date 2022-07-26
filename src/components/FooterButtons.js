import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from '../styles/RecipeDetailsFoods.module.css';

function FooterButtons() {
  const history = useHistory();
  const { url, params: { id } } = useRouteMatch();

  const handleClick = () => {
    if (url.includes('/foods')) {
      history.push(`/foods/${id}/in-progress`);
    }
    if (url.includes('/drinks')) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <footer>
      <button type="button" className={ styles.footerButton1 }>
        <a href="/foods">
          <i className="fas fa-arrow-left" />
          Back to recipes
        </a>
      </button>
      <button
        className={ styles.footerButton1 }
        id="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed' } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    </footer>
  );
}

export default FooterButtons;
