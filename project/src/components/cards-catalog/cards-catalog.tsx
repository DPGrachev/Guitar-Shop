import GuitarCard from '../guitar-card/guitar-card';
import { Guitar } from '../../types/guitar';

type CardsCatalogProps = {
  guitars: Guitar[],
  onAddInCartButtonClick: ( guitar :Guitar) => void;
}

function CardsCatalog ({guitars, onAddInCartButtonClick}: CardsCatalogProps) :JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid="cards_catalog_container">
      {guitars.map( (guitar) => <GuitarCard key={guitar.id} guitar={guitar} onAddInCartButtonClick={onAddInCartButtonClick}/>)}
    </div>
  );
}

export default CardsCatalog;
