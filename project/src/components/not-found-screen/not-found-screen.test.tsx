import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


describe('Component: NotFoundScreen', () => {
  const mockStore = configureMockStore();
  const store= mockStore({
    DATA: {
      similarGuitarCards : [],
    },
    CART: {
      guitarsInCart: [],
      numberOfGuitarsInCurt: {},
    },
  });
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundScreen />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText('Такой страницы не существует')).toBeInTheDocument();
    expect(screen.getByText(/вернуться на главную/i)).toBeInTheDocument();

  });
});
