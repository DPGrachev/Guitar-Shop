import GuitarCard from "../guitar-card/guitar-card";
import { useSelector} from 'react-redux';
import { getSortedGuitarCards } from "../../store/data-cards/selectors";

function CardsCatalog () :JSX.Element {
  const guitars = useSelector(getSortedGuitarCards).slice(0,9);

  return (
    <div className="cards catalog__cards">
      {guitars.map( (guitar) => <GuitarCard key={guitar.id} guitar={guitar}/>)}
    </div>
  )
}

export default CardsCatalog;
