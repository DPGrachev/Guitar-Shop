import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PromoCodeField from './promo-code-field';
import userEvent from '@testing-library/user-event';

describe('Component: PromoCodeField', () => {

  const fakeOnSetPromocodeClick = jest.fn();
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PromoCodeField onSetPromocodeClick={fakeOnSetPromocodeClick}/>
      </Router>,
    );

    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
  });

  it('when user pusn invalid promo code, should render failed message', () => {
    const history = createMemoryHistory();
    const FAKE_PROMOCODE = 'ascaeave';
    render(
      <Router history={history}>
        <PromoCodeField onSetPromocodeClick={fakeOnSetPromocodeClick}/>
      </Router>,
    );

    expect(screen.queryByText(/неверный промокод/i)).not.toBeInTheDocument();
    userEvent.paste(screen.getByTestId('codeInputField'), FAKE_PROMOCODE);
    userEvent.click(screen.getByTestId('confrimButton'));
    expect(screen.getByText(/неверный промокод/i)).toBeInTheDocument();
  });

  it('when user pusn valid promo code, should render succes message and onSetPromocodeClick be called', () => {
    const history = createMemoryHistory();
    const PROMOCODE = 'light-333';
    render(
      <Router history={history}>
        <PromoCodeField onSetPromocodeClick={fakeOnSetPromocodeClick}/>
      </Router>,
    );

    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
    userEvent.paste(screen.getByTestId('codeInputField'), PROMOCODE);
    userEvent.click(screen.getByTestId('confrimButton'));
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
    expect(fakeOnSetPromocodeClick).toBeCalled();
  });
});
