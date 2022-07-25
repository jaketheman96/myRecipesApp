import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRoute from './helpers/renderWithRoute';
import { iceMock, mLetterDrinks, yLetterDrinks } from './mocks/mock';

describe('Testes do componente Header:', () => {
  beforeEach(() => renderWithRoute('/drinks'));

  it('1. A busca retorna uma receita específica;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'bloody mary');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText('Bloody Mary')).toBeInTheDocument();
    }, { timeout: 3000 });
    expect(screen.getByText('Recipe details Drinks')).toBeInTheDocument();

  });

  it('2. A busca retorna apenas receitas com um determinado ingrediente;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'ice');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      iceMock.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });
  });

  it('3. A busca retorna apenas receitas que comecem com uma determinada letra;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'm');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      mLetterDrinks.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });

    userEvent.clear(searchBar);
    userEvent.type(searchBar, 'y');
    userEvent.click(searchBtn);

    await waitFor(() => {
      yLetterDrinks.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });

  });

  it('4. A busca retorna um alerta caso não encontre resultados;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const alertMock = jest.spyOn(window, 'alert');

    userEvent.type(searchBar, 'pleh');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
  });

  it('5. A busca retorna um alerta caso mais de uma letra seja fornecida ao filtrar pela primeira letra;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const alertMock = jest.spyOn(window, 'alert');

    userEvent.type(searchBar, 'pleh');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
  });

  it('6. Os resultados não são atualizados se nenhum radio button for selecionado;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    await waitFor(() => {
      expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    }, { timeout: 3000 });

    userEvent.type(searchBar, 'ice');
    userEvent.click(searchBtn);

    expect((screen.getByTestId('0-card-name')).innerHTML).toBe('GG');
  });
});
