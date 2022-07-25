import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRoute from './helpers/renderWithRoute';
import { tomatoMock, aLetterFoods, dLetterFoods } from './mocks/mock';

describe('Testes do componente Header:', () => {
  beforeEach(() => renderWithRoute('/foods'));

  it('1. A barra de busca aparece e some quando o botão de busca é clicado;', () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(searchBar).not.toBeInTheDocument();
    
  });

  it('2. A busca retorna uma receita específica;', async () => {
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
  });

  it('4. A busca retorna apenas receitas que comecem com uma determinada letra;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      aLetterFoods.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });

    /* dLetterFoods.forEach((name) => expect(screen.getByText(name)).not.toBeInTheDocument()); */

    userEvent.clear(searchBar);
    userEvent.type(searchBar, 'd');
    userEvent.click(searchBtn);

    await waitFor(() => {
      dLetterFoods.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    }, { timeout: 3000 });
  });

  it('5. A busca retorna um alerta caso não encontre resultados;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const alertMock = jest.spyOn(window, 'alert');

    userEvent.type(searchBar, 'pleh');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
  });

  it('6. A busca retorna um alerta caso mais de uma letra seja fornecida ao filtrar pela primeira letra;', async () => {
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

  it('7. Possui um link que redireciona para a página de perfil;', async () => {
    const profileLink = screen.getByTestId('profile-top-btn');
    userEvent.click(profileLink);

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('8. Os resultados não são atualizados se nenhum radio button for selecionado;', async () => {
    userEvent.click(screen.getByTestId('search-top-btn'));
    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    await waitFor(() => {
      expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    }, { timeout: 3000 });

    userEvent.type(searchBar, 'tomato');
    userEvent.click(searchBtn);

    expect((screen.getByTestId('0-card-name')).innerHTML).toBe('Corba');
  });
});
