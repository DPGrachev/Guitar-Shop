import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CardsCatalog from './cards-catalog';
import { mockGuitars } from '../../utils/mocks';


describe('Component: CardsCatalog', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CardsCatalog guitars={mockGuitars} onAddInCartButtonClick={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByTestId('cards_catalog_container')).toBeInTheDocument();
  });
});
