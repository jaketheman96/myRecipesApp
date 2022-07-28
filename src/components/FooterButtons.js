import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from '../styles/RecipeDetailsFoods.module.css';

function FooterButtons() {
  const history = useHistory();
  const { url, params: { id } } = useRouteMatch();
  const [showStartButton, setShowStartButton] = useState(true);
  const [buttonText, setButtonText] = useState('Start Recipe');

  const handleClick = () => {
    const getItem = localStorage.inProgressRecipes;
    if (getItem) {
      const getIdStorage = JSON.parse(localStorage.inProgressInfos);
      const { type, idRecipe } = getIdStorage;
      history.push(`/${type}/${idRecipe}/in-progress`);
    }
    if (!getItem) {
      if (url.includes('/foods')) {
        history.push(`/foods/${id}/in-progress`);
        localStorage.setItem('inProgressInfos', JSON.stringify({
          idRecipe: id, type: 'foods' }));
      }
      if (url.includes('/drinks')) {
        history.push(`/drinks/${id}/in-progress`);
        localStorage.setItem('inProgressInfos', JSON.stringify({
          idRecipe: id, type: 'drinks' }));
      }
    }
  };

  useEffect(() => {
    const handleStorageToButton = () => {
      const getItem = localStorage.doneRecipes;
      if (getItem) {
        const condition = JSON.parse(getItem).some((element) => element.id === id);
        if (condition) {
          setShowStartButton(false);
        }
      }
      if (!getItem) {
        setShowStartButton(true);
      }
    };
    handleStorageToButton();
  }, [id]);

  useEffect(() => {
    const getItem = localStorage.inProgressRecipes;
    if (getItem) {
      setButtonText('Continue Recipe');
    } else {
      setButtonText('Start Recipe');
    }
  }, []);

  return (
    <footer>
      <button type="button" className={ styles.footerButton1 }>
        <a href="/foods">
          <i className="fas fa-arrow-left" />
          Back to recipes
        </a>
      </button>
      {showStartButton && (
        <button
          className={ styles.footerButton1 }
          id="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed' } }
          onClick={ handleClick }
        >
          {buttonText}
        </button>
      )}
    </footer>
  );
}

export default FooterButtons;
