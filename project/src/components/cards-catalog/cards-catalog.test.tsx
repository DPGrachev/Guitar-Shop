import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CardsCatalog from './cards-catalog';
import { mockGuitars } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { createAPI } from '../../services/api';
import { Provider } from 'react-redux';


describe('Component: CardsCatalog', () => {
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
          <CardsCatalog guitars={mockGuitars} onAddInCartButtonClick={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('cards_catalog_container')).toBeInTheDocument();
  });
});
