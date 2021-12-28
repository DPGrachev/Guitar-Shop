import { Guitar } from '../../types/guitar';

type GuitarCardRatingProps = {
  guitar: Guitar,
}

function GuitarCardRating ({guitar}: GuitarCardRatingProps): JSX.Element {
  const RATING_VALUE = '12345';


  return (
    <>
      {Array.from(RATING_VALUE, (value, i) => (
        <svg width="12" height="11" aria-hidden="true" key={guitar.id+i} data-testid='cards-rating-star'>
          <use xlinkHref={guitar.rating >= Number(value) ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default GuitarCardRating;
