import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { mockGuitarCard } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import DeleteFromCartPopup from './delete-from-cart-popup';

const history = createMemoryHistory();

describe('Component: DeleteFromCartPopup', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const fakeClosePopupFn = jest.fn();
  const store= mockStore({
    CART: {
      guitarsInCart: [],
      numberOfGuitarsInCurt: {},
    },
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <DeleteFromCartPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Гитара Честер Bass/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул: SO757575/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });

  it('when user click on close button, onCloseButtonClick should be called', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <DeleteFromCartPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('close-button'));

    expect(fakeClosePopupFn).toBeCalled();
  });

});
