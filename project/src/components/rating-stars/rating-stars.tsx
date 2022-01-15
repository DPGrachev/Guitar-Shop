type RatingStarsProps = {
  rating: number,
  id: number|string,
  isGuitarScreen? : boolean,
  isComment? : boolean,
}

function RatingStars ({rating, id, isGuitarScreen, isComment}: RatingStarsProps): JSX.Element {
  const RATING_VALUE = '12345';
  const CATALOG_SCREEN_PARAMS = {
    width : 12,
    height : 11,
  };
  const GUITAR_SCREEN_PARAMS = {
    width : 14,
    height : 14,
  };
  const COMMENT_PARAMS = {
    width : 16,
    height : 16,
  };

  const getCorrectParams = () => {
    if(isGuitarScreen){
      return GUITAR_SCREEN_PARAMS;
    }else if(isComment){
      return COMMENT_PARAMS;
    }
    return CATALOG_SCREEN_PARAMS;
  };

  return (
    <>
      {Array.from(RATING_VALUE, (value, i) => (
        <svg width={getCorrectParams().width} height={getCorrectParams().height} aria-hidden="true" key={`${id}${i}`} data-testid='cards-rating-star'>
          <use xlinkHref={rating >= Number(value) ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default RatingStars;
