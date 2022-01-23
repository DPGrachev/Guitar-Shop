import { MouseEvent, useRef, useState } from 'react';
import { promoCode, PromoCodeStatus } from '../../const';

type PromoCodeFieldProps = {
  onSetPromocodeClick: (discont: number) => void,
}

function PromoCodeField ({onSetPromocodeClick} : PromoCodeFieldProps): JSX.Element {
  const codeInputField = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState(PromoCodeStatus.Default);

  const handleConfrimButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(codeInputField.current?.value){
      const promo = promoCode.find((code) => code.name === codeInputField.current?.value);
      if(promo){
        onSetPromocodeClick(promo.discont);
        setStatus(PromoCodeStatus.Succes);
      }else{
        setStatus(PromoCodeStatus.Failed);
      }
    }
  };

  return(
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input ref={codeInputField} type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
          {status === PromoCodeStatus.Succes && <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {status === PromoCodeStatus.Failed &&<p className="form-input__message form-input__message--error">неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button" onClick={handleConfrimButtonClick}>Применить</button>
      </form>
    </div>
  );
}

export default PromoCodeField;
