import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockGuitars } from '../../utils/mocks';
import { Provider } from 'react-redux';
import Cart from './cart';

describe('Component: Cart', () => {
  const mockStore = configureMockStore();
  const store= mockStore({
    DATA: {
      similarGuitarCards : mockGuitars,
    },
    CART: {
      guitarsInCart: [mockGuitars],
      numberOfGuitarsInCurt: {'1': 2},
    },
  });
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>,
      </Provider>,
    );

    expect(screen.getAllByText(/Корзина/i).length).toBe(2);
    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();

  });
});
