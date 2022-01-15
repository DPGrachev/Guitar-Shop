import { Comment } from '../../types/comment';
import RatingStars from '../rating-stars/rating-stars';

type CommentProps = {
  comment: Comment,
}

function CommentItem ({comment} : CommentProps):JSX.Element {

  return (
    <div className="review" key={comment.id}>
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{comment.createAt}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <RatingStars rating={comment.rating} id={comment.id} isComment/>
        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default CommentItem;
