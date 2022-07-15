import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Recipes from '../pages/Recipes';
import renderWithRoute from './helpers/renderWithRoute';

describe('Testes do componente Footer:', () => {
  /* beforeEach(() => renderWithRoute(<Recipes />));
 */
  it('1. Verifica se o componente existe.', () => {
    renderWithRoute(<Recipes />)
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('2. Verifica se a página é redirecionada corretamente ao clicar nos ícones.', () => {
    const { history } = renderWithRoute(<Recipes />);
    const foodLink = screen.getByTestId('food-bottom-btn');
    const drinksLink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksLink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(foodLink);
    expect(history.location.pathname).toBe('/foods')

  });
});
