import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, MouseEvent, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GuitarTypeTranslate } from '../../const';
import { fetchCurrentGuitarCardAction } from '../../store/api-actions';
import { getCurrentGuitarCard } from '../../store/data-cards/selectors';
import Footer from '../footer/footer';
import RatingStars from '../rating-stars/rating-stars';
import Header from '../header/header';
import CommentItem from '../comment-item/comment-item';
import dayjs from 'dayjs';
import NewCommentPopup from '../new_comment_popup/new_comment_popup';
import { Guitar } from '../../types/guitar';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import { formatePrice } from '../../utils/utils';
import AddInCartPopup from '../add-in-cart-popup/add-in-cart-popup';

type Params = {
  id: string,
}

enum Tabs {
  characteristics = 'characteristics',
  description = 'description',
}

function GuitarScreen ():JSX.Element {
  const COMMENTS_STEP = 3;
  const params: Params = useParams();
  const dispatch = useDispatch();
  const currentGuitarCard = useSelector(getCurrentGuitarCard);
  const currentGuitarCardId = Number(params.id);
  const [currentTab, setCurrentTab] = useState(Tabs.characteristics);
  const [openedCommentsCurrent, setOpenedCommentsCurrent] = useState(COMMENTS_STEP);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);
  const [isAddInCartForm, setIsAddInCartForm] = useState(false);
  const comments = currentGuitarCard?.comments.slice().sort((a,b) => dayjs(b.createAt).diff(dayjs(a.createAt)));

  useEffect(() => {
    if(isNewCommentForm || isAddInCartForm){
      window.addEventListener('keydown', handleEscKeydown);
      return function () {
        window.removeEventListener('keydown', handleEscKeydown);
      };
    }
  });

  useEffect(() => {
    dispatch(fetchCurrentGuitarCardAction(currentGuitarCardId));
  },[dispatch, currentGuitarCardId]);

  const handleTabsClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if(evt.currentTarget.dataset.name === currentTab){
      return;
    }
    setCurrentTab(evt.currentTarget.dataset.name as Tabs);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape'){
      setIsNewCommentForm(false);
      setIsAddInCartForm(false);
    }
  };

  const handleShowMoreButtonClick = () => {
    if(currentGuitarCard && currentGuitarCard.comments.length > openedCommentsCurrent){
      setOpenedCommentsCurrent(openedCommentsCurrent + COMMENTS_STEP);
    }
  };

  const handleAddNewCommentButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsNewCommentForm(true);
  };

  const handleUpButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scroll(0,0);
  };

  const closeNewCommentForm = () => {
    setIsNewCommentForm(false);
  };

  const closeAddInCartForm = () => {
    setIsAddInCartForm(false);
  };

  const handleAddInCartButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsAddInCartForm(true);
  };

  return (
    <>
      <Header />
      <main className="page-content">
        {isNewCommentForm &&
          <FocusLock>
            <RemoveScroll>
              <NewCommentPopup guitar={currentGuitarCard as Guitar} onCloseButtonClick={closeNewCommentForm}/>
            </RemoveScroll>
          </FocusLock>}
        {isAddInCartForm &&
          <FocusLock>
            <RemoveScroll>
              <AddInCartPopup guitar={currentGuitarCard as Guitar} onCloseButtonClick={closeAddInCartForm}/>
            </RemoveScroll>
          </FocusLock>}
        <div className="container">
          {!currentGuitarCard || currentGuitarCard.id !== currentGuitarCardId
            ? <h1>...Загрузка</h1>
            :
            <>
              <h1 className="page-content__title title title--bigger">{currentGuitarCard.name}</h1>
              <ul className="breadcrumbs page-content__breadcrumbs">
                <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
                </li>
                <li className="breadcrumbs__item"><Link className="link" to={AppRoute.FirstCatalogPage}>Каталог</Link>
                </li>
                <li className="breadcrumbs__item"><a className="link" href='/'>{currentGuitarCard.name}</a>
                </li>
              </ul>
              <div className="product-container"><img className="product-container__img" src={`../${currentGuitarCard.previewImg}`} width="90" height="235" alt=""/>
                <div className="product-container__info-wrapper">
                  <h2 className="product-container__title title title--big title--uppercase">{currentGuitarCard.name}</h2>
                  <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                    <RatingStars rating={currentGuitarCard.rating} id={currentGuitarCard.id} isGuitarScreen/>
                    {currentGuitarCard.comments.length > 0 && <span className="rate__count">{currentGuitarCard.comments.length}</span>}
                  </div>
                  <div className="tabs">
                    <a className={`button button--medium tabs__button ${currentTab !== Tabs.characteristics ? 'button--black-border' : ''}`} href="#characteristics" data-name={Tabs.characteristics} onClick={handleTabsClick}>Характеристики</a>
                    <a className={`button button--medium tabs__button ${currentTab !== Tabs.description ? 'button--black-border' : ''}`} href="#description" data-name={Tabs.description} onClick={handleTabsClick}>Описание</a>
                    <div className="tabs__content" id={currentTab}>
                      <table className={`tabs__table ${currentTab !== Tabs.characteristics ? 'hidden' : ''}`}>
                        <tbody>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Артикул:</td>
                            <td className="tabs__value">{currentGuitarCard.vendorCode}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Тип:</td>
                            <td className="tabs__value">{GuitarTypeTranslate[currentGuitarCard.type]}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Количество струн:</td>
                            <td className="tabs__value">{currentGuitarCard.stringCount} струнная</td>
                          </tr>
                        </tbody>

                      </table>
                      <p className={`tabs__product-description ${currentTab !== Tabs.description ? 'hidden' : ''}`}>{currentGuitarCard.description}</p>
                    </div>
                  </div>
                </div>
                <div className="product-container__price-wrapper">
                  <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                  <p className="product-container__price-info product-container__price-info--value">{formatePrice(currentGuitarCard.price)}</p><a className="button button--red button--big product-container__button" href="/" onClick={handleAddInCartButtonClick}>Добавить в корзину</a>
                </div>
              </div>
              <section className="reviews">
                <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="/" onClick={handleAddNewCommentButtonClick}>Оставить отзыв</a>
                {comments?.length === 0 && <h3 className="reviews__title title title--bigger">На данный товар еще не написано отзывов</h3>}
                {comments?.slice(0,openedCommentsCurrent).map((comment) => <CommentItem comment={comment} key={comment.id}/>)}
                {comments && comments.length > openedCommentsCurrent && <button className="button button--medium reviews__more-button" onClick={handleShowMoreButtonClick}>Показать еще отзывы</button>}
                <a className="button button--up button--red-border button--big reviews__up-button" href="#header" onClick={handleUpButtonClick}>Наверх</a>
              </section>
            </>}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default GuitarScreen;
