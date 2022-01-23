import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitarsinCurt, getNumberOfGuitarsInCurt } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import Footer from '../footer/footer';
import GuirarCardInCart from '../guitar-card-in-cart/guitar-card-in-cart';
import Header from '../header/header';
import {RemoveScroll} from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import DeleteFromCartPopup from '../delete-from-cart-popup/delete-from-cart-popup';
import { formatePrice } from '../../utils/utils';
import PromoCodeField from '../promo-code-field/promo-code-field';

function Cart (): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsinCurt);
  const numberOfGuitarsInCurt = useSelector(getNumberOfGuitarsInCurt);
  const [removableGuitar, setRemovableGuitar] = useState<Guitar | null>(null);
  const [isDeleteFromCartForm, setIsDeleteFromCartForm] = useState(false);
  const [discont, setDiscont] = useState(0);
  const totalQuantity = guitarsInCart.reduce((acc,guitar) => acc + guitar.price * numberOfGuitarsInCurt[guitar.id], 0);
  const totalDiscont = totalQuantity * discont / 100;

  const closeDeleteFromCartForm = () => {
    setIsDeleteFromCartForm(false);
  };

  const openDeleteFromCartForm = (guitar: Guitar) => {
    setRemovableGuitar(guitar);
    setIsDeleteFromCartForm(true);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape'){
      setIsDeleteFromCartForm(false);
    }
  };

  useEffect(() => {
    if(isDeleteFromCartForm){
      window.addEventListener('keydown', handleEscKeydown);
      return function () {
        window.removeEventListener('keydown', handleEscKeydown);
      };
    }
  });

  return (
    <>
      <Header />
      <main className="page-content">
        {isDeleteFromCartForm && removableGuitar &&
          <FocusLock>
            <RemoveScroll>
              <DeleteFromCartPopup guitar={removableGuitar} onCloseButtonClick={closeDeleteFromCartForm}/>
            </RemoveScroll>
          </FocusLock>}
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.FirstCatalogPage}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Cart}>Корзина</Link>
            </li>
          </ul>
          <div className="cart">
            {guitarsInCart.length === 0 && <h1>Корзина пуста</h1>}
            {guitarsInCart.map((guitar) => <GuirarCardInCart key={guitar.id} guitar={guitar} onDeleteFromCartButtonClick={openDeleteFromCartForm}/>)}
            <div className="cart__footer">
              <PromoCodeField onSetPromocodeClick={setDiscont}/>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{formatePrice(totalQuantity)}</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${totalDiscont ? 'cart__total-value--bonus' : ''}`}>{totalDiscont ? `- ${formatePrice(totalDiscont)}` : '0 ₽'}</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{formatePrice(totalQuantity - totalDiscont)}</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
