import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import GuitarScreen from './guitar-screen';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { mockGuitarCard, mockGuitarWithComment } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

describe('Component: GuitarScreen', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly without comments', () => {
    const store= mockStore({
      DATA: {
        currentGuitarCard: mockGuitarCard,
        similarGuitarCards : [],
      },
      CART: {
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/На данный товар еще не написано отзывов/i)).toBeInTheDocument();
    expect(screen.queryByText(/Комментарий/i)).not.toBeInTheDocument();
  });

  it('should render correctly with comments', () => {
    const store= mockStore({
      DATA: {
        currentGuitarCard: mockGuitarWithComment,
        similarGuitarCards : [],
      },
      CART: {
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.queryByText(/На данный товар еще не написано отзывов/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });

  it('when user click on description tab, open description', () => {
    const store= mockStore({
      DATA: {
        currentGuitarCard: mockGuitarWithComment,
        similarGuitarCards : [],
      },
      CART: {
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(mockGuitarWithComment.description).classList).toContain('hidden');

    userEvent.click(screen.getByText(/Описание/i));
    expect(screen.getByText(mockGuitarWithComment.description).classList).not.toContain('hidden');
  });

  it('when user click on add new comment button should open popup', () => {
    const store= mockStore({
      DATA: {
        currentGuitarCard: mockGuitarWithComment,
        similarGuitarCards : [],
      },
      CART: {
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Ваша Оценка/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ваше Имя/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Оставить отзыв/i));
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('when user click on add in cart button should open popup', () => {
    const store= mockStore({
      DATA: {
        currentGuitarCard: mockGuitarWithComment,
        similarGuitarCards : [],
      },
      CART: {
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Добавить товар в корзину/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Добавить в корзину/i));
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });

});
