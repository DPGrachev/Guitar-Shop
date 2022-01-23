import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import NewCommentPopup from './new_comment_popup';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import { mockGuitarCard } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { CommentPost } from '../../types/comment';

const history = createMemoryHistory();

describe('Component: NewCommentPopup', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const fakeClosePopupFn = jest.fn();

  it('should render correctly', () => {
    const store= mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('when user click on close button, onCloseButtonClick should be called', () => {
    const store= mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('close-button'));

    expect(fakeClosePopupFn).toBeCalled();
  });

  it('when user click send comment button without paste name and rating, should not show other popup', () => {
    const store= mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Отправить отзыв/i));

    expect(screen.queryByText(/Cпасибо за ваш отзыв!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('when user click send comment button with all the fields filled, should show other popup', () => {
    const store= mockStore();
    const fakeCommentPost: CommentPost = {
      userName: 'Саша',
      advantage: 'Хорошо. Очень хорошо.',
      disadvantage: 'Плохо. Очень плохо.',
      comment: 'Неплохо, но дорого.',
      rating: 3,
      guitarId: 1,
    };

    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentPopup guitar={mockGuitarCard} onCloseButtonClick={fakeClosePopupFn}/>
        </Router>
      </Provider>,
    );

    userEvent.paste(screen.getByTestId('user-name'), fakeCommentPost.userName);
    userEvent.click(screen.getByTestId('star-3'));
    userEvent.paste(screen.getByTestId('advantage'), fakeCommentPost.advantage);
    userEvent.paste(screen.getByTestId('disadvantage'), fakeCommentPost.disadvantage);
    userEvent.paste(screen.getByTestId('comment'), fakeCommentPost.comment);
    userEvent.click(screen.getByText(/Отправить отзыв/i));

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();
  });
});
