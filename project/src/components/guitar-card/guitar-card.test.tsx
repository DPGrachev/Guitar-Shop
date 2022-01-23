import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import GuitarCard from './guitar-card';
import { mockGuitarCard } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
describe('Component: GuitarCard', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store= mockStore({
    CART: {
      guitarsInCart: [],
    },
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCard guitar={mockGuitarCard} onAddInCartButtonClick={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mockGuitarCard.name)).toBeInTheDocument();
    expect(screen.getByText(/рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/купить/i)).toBeInTheDocument();
  });
});
