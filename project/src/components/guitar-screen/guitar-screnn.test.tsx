import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import GuitarScreen from './guitar-screen';


describe('Component: GuitarScreen', () => {
  const mockStore = configureMockStore();
  const store= mockStore({
    DATA: {similarGuitarCards : []},
  });
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Страница в разработке/i)).toBeInTheDocument();
    expect(screen.getByText(/вернуться на главную/i)).toBeInTheDocument();

  });
});
