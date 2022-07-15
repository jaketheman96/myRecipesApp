import React from 'react';
import { render, screen } from '@testing-library/react';
import Recipes from '../pages/Recipes';

describe('Testes do componente Footer:', () => {
  beforeEach(() => render(<Recipes />));

  it('1. Verifica se o componente existe.', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
