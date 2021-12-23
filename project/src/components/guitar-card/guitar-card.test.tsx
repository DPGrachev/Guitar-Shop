import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import GuitarCard from './guitar-card';
import { mockGuitarCard } from '../../utils/mocks';

describe('Component: GuitarCard', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={''}>
        <GuitarCard guitar={mockGuitarCard}/>
      </Router>
    )

    expect(screen.getByText(mockGuitarCard.name)).toBeInTheDocument();
    expect(screen.getByText(/рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/купить/i)).toBeInTheDocument();
  })
});
