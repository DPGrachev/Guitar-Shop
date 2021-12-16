import { Guitar } from "../../types/guitar";
import GuitarCardRating from "../guitar-card-rating/guitar-card-rating";

type GuitarCardProps = {
  guitar: Guitar,
}

function GuitarCard ({guitar} : GuitarCardProps) :JSX.Element {
  return (
    <div className="product-card"><img src={guitar.previewImg} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <GuitarCardRating guitar={guitar}/>
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
