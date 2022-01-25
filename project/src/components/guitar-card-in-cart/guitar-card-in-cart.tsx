import { ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarTypeTranslate } from '../../const';
import { setNumberOfGuitarInCurt } from '../../store/actions';
import { getNumberOfGuitarsInCurt } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/utils';

type GuitarCardInCartProps = {
  guitar: Guitar,
  onDeleteFromCartButtonClick: ( guitar :Guitar) => void;
}

function GuitarCardInCart ({guitar, onDeleteFromCartButtonClick}: GuitarCardInCartProps): JSX.Element {
  const quantityField = useRef<HTMLInputElement>(null);
  const numberInCart = useSelector(getNumberOfGuitarsInCurt)[guitar.id];
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    onDeleteFromCartButtonClick(guitar);
  };

  const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(!evt.currentTarget.value){
      return;
    }
    if(Number(evt.currentTarget.value) > 99){
      evt.currentTarget.value = '99';
    }
    if(Number(evt.currentTarget.value) < 1){
      evt.currentTarget.value = '1';
    }
    const quantity = Number(evt.currentTarget.value);
    dispatch(setNumberOfGuitarInCurt(guitar.id,quantity));
  };

  const handleQuantityFiledBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if(!evt.currentTarget.value){
      evt.currentTarget.value = '1';
      dispatch(setNumberOfGuitarInCurt(guitar.id,1));
    }
  };

  const handleIncrementButtonClick = () => {
    if(quantityField.current?.value){
      const newValue = Number(quantityField.current.value) + 1;
      if(newValue > 99) {return;}
      quantityField.current.value = String(newValue);
      dispatch(setNumberOfGuitarInCurt(guitar.id,newValue));
    }
  };

  const handleDecrementButtonClick = () => {
    if(quantityField.current?.value){
      const newValue = Number(quantityField.current.value) - 1;
      if(newValue < 1){
        onDeleteFromCartButtonClick(guitar);
        return;
      }
      quantityField.current.value = String(newValue);
      dispatch(setNumberOfGuitarInCurt(guitar.id,newValue));
    }
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" data-testid='deleteButton' onClick={handleDeleteButtonClick}>
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={guitar.previewImg} width="55" height="130" alt="ЭлектроГитара Честер bass"/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{GuitarTypeTranslate[guitar.type]}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(guitar.price)}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" data-testid='decBtn' onClick={handleDecrementButtonClick}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input ref={quantityField} data-testid='quantityField' className="quantity__input" type="number" id="2-count" name="2-count" max="99" defaultValue={numberInCart} onChange={handleQuantityChange} onBlur={handleQuantityFiledBlur}/>
        <button className="quantity__button" aria-label="Увеличить количество" data-testid='incBtn' onClick={handleIncrementButtonClick}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(guitar.price * numberInCart)}</div>
    </div>
  );
}

export default GuitarCardInCart;
