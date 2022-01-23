import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import CatalogScreen from './catalog-screen';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { mockGuitars } from '../../utils/mocks';

const history = createMemoryHistory();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    number: '1',
  }),
}));

describe('Component: CatalogScreen', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly with guitar cards', () => {
    const store= mockStore({
      DATA: {
        guitarCards : mockGuitars,
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

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.queryByText(/Загрузка.../i)).not.toBeInTheDocument();
  });

  it('should render correctly without guitar cards', () => {
    const store= mockStore({
      DATA: {
        guitarCards : [],
        similarGuitarCards : [],
        cardsTotalCount : 0,
        maxPrice: 0,
        minPrice: 0,
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
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });

});
