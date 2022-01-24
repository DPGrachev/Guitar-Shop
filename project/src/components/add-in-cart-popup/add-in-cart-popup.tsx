import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, GuitarTypeTranslate } from '../../const';
import { setGuitarInCart, setNumberOfGuitarInCurt } from '../../store/actions';
import { getGuitarsinCurt, getNumberOfGuitarsInCurt } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import { formatePrice } from '../../utils/utils';

type AddInCartPopupProps = {
  guitar: Guitar,
  onCloseButtonClick: () => void,
  isCatalogScreen? : boolean,
}

function AddInCartPopup ({guitar, onCloseButtonClick, isCatalogScreen} : AddInCartPopupProps): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsinCurt);
  const numberOfGuitarsInCurt = useSelector(getNumberOfGuitarsInCurt);
  const [isGuitarAddInCart, setIsGuitarAddInCart] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddInCartButtonClick = () => {
    if(!guitarsInCart.find((guitarInCart) => guitarInCart.id === guitar.id)){
      dispatch(setGuitarInCart(guitar));
      dispatch(setNumberOfGuitarInCurt(guitar.id, 1));
    }else{
      dispatch(setNumberOfGuitarInCurt(guitar.id, numberOfGuitarsInCurt[guitar.id]+1));
    }
    setIsGuitarAddInCart(true);
  };

  const handleContinueShoppingButtonClick = () => isCatalogScreen ? onCloseButtonClick() : history.push(AppRoute.FirstCatalogPage);
  const handleGotoCartButtonClick = () => history.push(AppRoute.Cart);

  if(isGuitarAddInCart){
    return(
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onCloseButtonClick}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button" onClick={handleGotoCartButtonClick}>Перейти в корзину</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleContinueShoppingButtonClick}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseButtonClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onCloseButtonClick}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info"><img className="modal__img" src={`../${guitar.previewImg}`} width="67" height="137" alt="Честер bass"/>
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{GuitarTypeTranslate[guitar.type]}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{formatePrice(guitar.price)}</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddInCartButtonClick}>Добавить в корзину</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" data-testid='close-button' onClick={onCloseButtonClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInCartPopup;
