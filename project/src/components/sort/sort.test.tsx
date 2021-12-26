import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Sort from './sort';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Sort', () => {
  const store= mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });

});
