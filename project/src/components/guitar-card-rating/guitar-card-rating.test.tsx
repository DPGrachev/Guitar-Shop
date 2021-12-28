import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { mockGuitarCard } from '../../utils/mocks';
import GuitarCardRating from './guitar-card-rating';


describe('Component: GuitarCardRating', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <GuitarCardRating guitar={mockGuitarCard}/>
      </Router>,
    );

    expect(screen.getAllByTestId('cards-rating-star')).toHaveLength(5);
  });
});
