import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Pagination from './pagination';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    number: '1',
  }),
}));

describe('Component: Pagination', () => {
  const mockStore = configureMockStore();
  it('should render correctly with cards total count > 27', () => {
    const store= mockStore({
      DATA: {cardsTotalCount : 30},
    });

    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('list').childNodes).toHaveLength(4);
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly with cards total count = 27', () => {
    const store= mockStore({
      DATA: {cardsTotalCount : 27},
    });

    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('list').childNodes).toHaveLength(4);
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly with cards total count = 8', () => {
    const store= mockStore({
      DATA: {cardsTotalCount : 8},
    });

    const history = createMemoryHistory();
    history.push('/catalog/page_1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('list').childNodes).toHaveLength(1);
  });

});
