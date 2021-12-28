import GuitarCard from '../guitar-card/guitar-card';
import { Guitar } from '../../types/guitar';

type CardsCatalogProps = {
  guitars: Guitar[],
}

function CardsCatalog ({guitars}: CardsCatalogProps) :JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid="cards_catalog_container">
      {guitars.map( (guitar) => <GuitarCard key={guitar.id} guitar={guitar}/>)}
    </div>
  );
}

export default CardsCatalog;
