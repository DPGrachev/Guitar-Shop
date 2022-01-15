import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { mockGuitarCard } from '../../utils/mocks';
import RatingStars from './rating-stars';


describe('Component: GuitarCardRating', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <RatingStars rating={mockGuitarCard.rating} id={mockGuitarCard.id}/>
      </Router>,
    );

    expect(screen.getAllByTestId('cards-rating-star')).toHaveLength(5);
  });
});
