import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
/* import Recipes from '../pages/Recipes'; */
import renderWithRoute from './helpers/renderWithRoute';

describe('Testes do componente Footer:', () => {
  /* beforeEach(() => renderWithRoute(<Recipes />));
 */
  it('1. Verifica se o componente existe.', () => {
    renderWithRoute('/foods')
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('2. Verifica se a página é redirecionada corretamente ao clicar nos ícones.', () => {
    const { history } = renderWithRoute('/foods');
    const foodLink = screen.getByTestId('food-bottom-btn');
    const drinksLink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksLink);
    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks')
    });
    userEvent.click(foodLink);
    expect(history.location.pathname).toBe('/foods')
  });
});
