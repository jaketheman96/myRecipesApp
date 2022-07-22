import React from 'react';
/* import { Link } from 'react-router-dom'; */
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="Drinks"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="Food"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}
