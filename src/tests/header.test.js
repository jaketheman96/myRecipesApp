import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRoute from './helpers/renderWithRoute';
import { tomatoMock } from './mocks/mock';

describe('Testes do componente Header:', () => {
  it('1. A barra de busca aparece e some quando o botão de busca é clicado;', () => {
    renderWithRoute('/foods');
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(searchBar).not.toBeInTheDocument();
    
  });

  it('2. A busca retorna uma receita específica;', async () => {
    renderWithRoute('/foods');

    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText('Recipe Details Food')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Corba')).toBeInTheDocument();
  });

  it('3. A busca retorna apenas receitas com um determinado ingrediente;', async () => {
    renderWithRoute('/foods');
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'tomato');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      tomatoMock.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });

    /* tomatoMock.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument()); */

  })

});
