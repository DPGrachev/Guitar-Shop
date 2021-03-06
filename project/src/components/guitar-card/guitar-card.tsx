import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitarsInCurt } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import RatingStars from '../rating-stars/rating-stars';

type GuitarCardProps = {
  guitar: Guitar,
  onAddInCartButtonClick: ( guitar :Guitar) => void;
}

function GuitarCard ({guitar, onAddInCartButtonClick} : GuitarCardProps) :JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCurt);

  const handleAddInCartButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onAddInCartButtonClick(guitar);
  };

  return (
    <div className="product-card"><img src={`../${guitar.previewImg}`} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <RatingStars rating={guitar.rating} id={guitar.id}/>
          <span className="rate__count">{guitar.comments.length}</span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${guitar.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`/guitars/${guitar.id}`}>Подробнее</Link>
        {
          guitarsInCart.find((guitarInCart) => guitarInCart.id === guitar.id)
            ? <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.Cart}>В Корзине</Link>
            : <a className="button button--red button--mini button--add-to-cart" href="/" onClick={handleAddInCartButtonClick}>Купить</a>
        }
      </div>
    </div>
  );
}

export default GuitarCard;
