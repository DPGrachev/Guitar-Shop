import { Guitar } from "../../types/guitar";

type GuitarCardProps = {
  guitar: Guitar,
}

function GuitarCard ({guitar} : GuitarCardProps) :JSX.Element {
  return (
    <div className="product-card"><img src={`${guitar.previewImg}.jpg`} srcSet={`${guitar.previewImg}-0@2x.jpg 2x`} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={guitar.rating >= 2 ? "#icon-full-star" : "#icon-star"}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={guitar.rating >= 3 ? "#icon-full-star" : "#icon-star"}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={guitar.rating >= 4 ? "#icon-full-star" : "#icon-star"}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={guitar.rating >= 5 ? "#icon-full-star" : "#icon-star"}></use>
          </svg><span className="rate__count">9</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${guitar.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  )
}

export default GuitarCard;
