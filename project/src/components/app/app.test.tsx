import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { mockGuitarCard, mockGuitars } from '../../utils/mocks';
import App from './app';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

describe('Application Routing', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store= mockStore({
    DATA: {
      guitarCards : mockGuitars,
      currentGuitarCard: mockGuitarCard,
      similarGuitarCards : [],
      cardsTotalCount : 27,
      maxPrice: 1000,
      minPrice: 10,
    },
    CATALOG: {
      sortedOptions: '',
      currentPageOptions: '',
      guitarTypeFilter: [],
      stringCountFilter: [],
      priceRangeFilter: [0,0],
    },
    CART: {
      guitarsInCart: [],
      numberOfGuitarsInCurt: {},
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Главная страница/i)).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog/page_:number"', () => {
    history.push(AppRoute.FirstCatalogPage);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "GuitarScreen" when user navigate to "/guitars/:id"', () => {
    history.push('/guitars/1');
    render(fakeApp);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Такой страницы не существует/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });

  it('should render "Cart" when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);
    render(fakeApp);

    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });

});
