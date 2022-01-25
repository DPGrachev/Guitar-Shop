import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PromoCodeField from './promo-code-field';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import {Action} from 'redux';
import { PromoCodeStatus } from '../../const';
import { Provider } from 'react-redux';

describe('Component: PromoCodeField', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store= mockStore({
      CART: {
        promoCodeStatus: PromoCodeStatus.Default,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PromoCodeField />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
  });

  it('when promo code status Failed, should render failed message', () => {
    const history = createMemoryHistory();
    const store= mockStore({
      CART: {
        promoCodeStatus: PromoCodeStatus.Failed,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PromoCodeField />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/неверный промокод/i)).toBeInTheDocument();
  });

  it('when promo code status Success, should render success message', () => {
    const history = createMemoryHistory();
    const store= mockStore({
      CART: {
        promoCodeStatus: PromoCodeStatus.Success,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PromoCodeField />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
  });
});
