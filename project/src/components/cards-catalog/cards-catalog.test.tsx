import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CardsCatalog from './cards-catalog';
import { mockGuitars } from '../../utils/mocks';


describe('Component: CardsCatalog', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {container} = render(
      <Router history={history}>
        <CardsCatalog guitars={mockGuitars}/>
      </Router>,
    );

    expect(container.querySelector('.catalog__cards')).toBeInTheDocument();
  });
});
