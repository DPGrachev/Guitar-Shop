import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { mockGuitars } from '../../utils/mocks';
import { Provider } from 'react-redux';
import Search from './search';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Search', () => {
  it('should render correctly with guitar cards', () => {
    const store= mockStore({
      DATA: {similarGuitarCards : mockGuitars},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Search />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list').childNodes).toHaveLength(mockGuitars.length);
  });

  it('should render correctly without guitar cards', () => {
    const store= mockStore({
      DATA: {similarGuitarCards : []},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Search />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list').childNodes).toHaveLength(0);
  });
});
