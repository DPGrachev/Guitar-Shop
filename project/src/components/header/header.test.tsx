import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { mockGuitars } from '../../utils/mocks';
import Header from './header';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: Header', () => {
  const store= mockStore({
    DATA: {similarGuitarCards : mockGuitars},
  })
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router navigator={history} location={''}>
          <Header />
        </Router>
      </Provider>
    )

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  })
});
