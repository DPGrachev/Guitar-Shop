import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import GuirarCardInCart from './guitar-card-in-cart';
import { mockGuitarCard } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
describe('Component: GuirarCardInCart', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store= mockStore({
    CART: {
      guitarsInCart: [mockGuitarCard],
      numberOfGuitarsInCurt: { '1': 1},
    },
  });

  const fakeOnDeleteFromCartButtonClick = jest.fn();

  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mockGuitarCard.name)).toBeInTheDocument();
    expect(screen.getByText(/Артикул: SO757575/i)).toBeInTheDocument();
    expect(screen.getAllByText(/17 500 ₽/i).length).toBe(2);
  });

  it('when user click delete button,onDeleteFromCartButtonClick should be called', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('deleteButton'));
    expect(fakeOnDeleteFromCartButtonClick).toBeCalled();
  });

  it('when user click decrement button and quantity = 1,onDeleteFromCartButtonClick should be called', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('decBtn'));
    expect(fakeOnDeleteFromCartButtonClick).toBeCalled();
  });

  it('when user click increment button and quantity = 1,quantity should be 2', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '1');
    userEvent.click(screen.getByTestId('incBtn'));
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '2');

  });

  it('when user input new quantity = 10,quantity should be 10', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '1');
    userEvent.paste(screen.getByTestId('quantityField'), '0');
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '10');
  });

  it('when user input new quantity > 99,quantity should be 99', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuirarCardInCart guitar={mockGuitarCard} onDeleteFromCartButtonClick={fakeOnDeleteFromCartButtonClick}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '1');
    userEvent.paste(screen.getByTestId('quantityField'), '123');
    expect(screen.getByTestId('quantityField')).toHaveProperty('value', '99');
  });
});
