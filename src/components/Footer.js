import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      <img src={ mealIcon } alt="Food" data-testid="food-bottom-btn" />
    </footer>
  );
}
