import GuitarCard from "../guitar-card/guitar-card";

function CardsCatalog () :JSX.Element {
  const cards = new Array(8).fill('');

  return (
    <div className="cards catalog__cards">
      {cards.map( () => <GuitarCard />)}
    </div>
  )
}

export default CardsCatalog;
