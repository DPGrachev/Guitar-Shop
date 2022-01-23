import { MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PromoCodeStatus } from '../../const';
import { postCoupon } from '../../store/api-actions';
import { getPromoCodeStatus } from '../../store/cart/selectors';

function PromoCodeField (): JSX.Element {
  const codeInputField = useRef<HTMLInputElement>(null);
  const status = useSelector(getPromoCodeStatus);
  const dispatch = useDispatch();

  const handleConfrimButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(codeInputField.current?.value){
      dispatch(postCoupon({coupon: codeInputField.current.value}));
    }
  };

  return(
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input ref={codeInputField} type="text" placeholder="Введите промокод" id="coupon" name="coupon" data-testid='codeInputField'/>
          {status === PromoCodeStatus.Succes && <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {status === PromoCodeStatus.Failed &&<p className="form-input__message form-input__message--error">неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button" onClick={handleConfrimButtonClick} data-testid='confrimButton'>Применить</button>
      </form>
    </div>
  );
}

export default PromoCodeField;
