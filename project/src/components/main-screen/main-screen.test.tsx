import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MainScreen from './main-screen';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockGuitars } from '../../utils/mocks';
import { Provider } from 'react-redux';

describe('Component: MainScreen', () => {
  const mockStore = configureMockStore();
  const store= mockStore({
    DATA: {similarGuitarCards : mockGuitars},
  });
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Главная страница/i)).toBeInTheDocument();
  });
});
