import { useDispatch } from 'react-redux';
import { GuitarTypeTranslate } from '../../const';
import { removeGuitarInCart } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { formatePrice } from '../../utils/utils';

type DeleteFromCartPopupProps = {
  guitar: Guitar,
  onCloseButtonClick: () => void,
}

function DeleteFromCartPopup ({guitar, onCloseButtonClick} : DeleteFromCartPopupProps): JSX.Element {
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    dispatch(removeGuitarInCart(guitar));
    onCloseButtonClick();
  };

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onCloseButtonClick}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info"><img className="modal__img" src={`../${guitar.previewImg}`} width="67" height="137" alt="Честер bass"/>
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{GuitarTypeTranslate[guitar.type]}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{formatePrice(guitar.price)}</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--small modal__button" onClick={handleDeleteButtonClick}>Удалить товар</button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={onCloseButtonClick}>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" data-testid="close-button" onClick={onCloseButtonClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFromCartPopup;
