import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CommentItem from './comment-item';
import { mockComment } from '../../utils/mocks';


describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CommentItem comment={mockComment}/>
      </Router>,
    );

    expect(screen.getByText(mockComment.userName)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText(mockComment.advantage)).toBeInTheDocument();
    expect(screen.getByText(mockComment.disadvantage)).toBeInTheDocument();

  });
});
