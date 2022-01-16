import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewComment } from '../../store/api-actions';
import { CommentPost } from '../../types/comment';
import { Guitar } from '../../types/guitar';

type NewCommentPopupProps = {
  guitar: Guitar,
  onCloseButtonClick: () => void,
}

function NewCommentPopup ({guitar, onCloseButtonClick} : NewCommentPopupProps): JSX.Element {
  const advantageField = useRef<HTMLInputElement>(null);
  const disadvantageField = useRef<HTMLInputElement>(null);
  const commentField = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const [isCommentSent, setIsCommentSent] = useState(false);
  const dispatch = useDispatch();

  const handleRatingClick = (evt: MouseEvent<HTMLInputElement>) => {
    setCurrentRating(Number(evt.currentTarget.value));
  };

  const handleNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.currentTarget.value);
  };

  const handleSendButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(!name || !currentRating){
      return;
    }
    const commentPost: CommentPost = {
      guitarId: guitar.id,
      userName: name,
      advantage: advantageField.current?.value || '',
      disadvantage: disadvantageField.current?.value || '',
      comment: commentField.current?.value || '',
      rating: currentRating,
    };
    dispatch(postNewComment(commentPost));
    setIsCommentSent(true);
  };

  if(isCommentSent){
    return(
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onCloseButtonClick}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={onCloseButtonClick}>К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseButtonClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onCloseButtonClick}></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
          <form className="form-review">
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" onChange={handleNameInputChange}/>
                {name.length === 0 && <span className="form-review__warning">Заполните поле</span>}
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" onClick={handleRatingClick}/>
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" onClick={handleRatingClick}/>
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" onClick={handleRatingClick}/>
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" onClick={handleRatingClick}/>
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" onClick={handleRatingClick}/>
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>
                  {currentRating === 0 && <span className="rate__message">Поставьте оценку</span>}
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input className="form-review__input" id="pros" type="text" autoComplete="off" ref={advantageField}/>
            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input className="form-review__input" id="user-name" type="text" autoComplete="off" ref={disadvantageField}/>
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off" ref={commentField}></textarea>
            <button className="button button--medium-20 form-review__button" type="submit" onClick={handleSendButtonClick}>Отправить отзыв</button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseButtonClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCommentPopup;
