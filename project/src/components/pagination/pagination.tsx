import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setCurrentPageOptions } from '../../store/actions';
import { getCardsTotalCount } from '../../store/data-cards/selectors';

type Params = {
  number: string,
}

function Pagination () :JSX.Element {
  const CARDS_COUNT_IN_PAGE = 9;
  const initialPageNumbers = [1,2,3];
  const params: Params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const cardsTotalCount = useSelector(getCardsTotalCount);
  const currentPageNumber = Number(params.number);
  const [pageNumbers, setPageNumbers] = useState(initialPageNumbers);

  useEffect(()=> {
    if(cardsTotalCount && (currentPageNumber - 1) * CARDS_COUNT_IN_PAGE >= cardsTotalCount ){
      history.push(AppRoute.FirstCatalogPage);
    }
  },[cardsTotalCount,currentPageNumber, CARDS_COUNT_IN_PAGE, history ]);


  if(!pageNumbers.includes(currentPageNumber)){
    if(currentPageNumber % pageNumbers.length){
      setPageNumbers(pageNumbers.map((number) => number + (pageNumbers.length * Math.floor(currentPageNumber / pageNumbers.length))));
    }else{
      setPageNumbers(pageNumbers.map((number) => number + (pageNumbers.length * (currentPageNumber / pageNumbers.length - 1))));
    }
  }

  useEffect(()=> {
    dispatch(setCurrentPageOptions(`&_start=${(currentPageNumber - 1) * CARDS_COUNT_IN_PAGE}&_limit=${CARDS_COUNT_IN_PAGE}`));
  },[dispatch, currentPageNumber]);

  const onNextButtonClick = () => {
    setPageNumbers(pageNumbers.map((number) => number += pageNumbers.length));
  };

  const onPrevButtonClick = () => {
    setPageNumbers(pageNumbers.map((number) => number -= pageNumbers.length));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pageNumbers[0] !== initialPageNumbers[0] &&
          <li className="pagination__page pagination__page--prev" id="prev"><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[0] - 1}`} onClick={onPrevButtonClick}>Назад</Link>
          </li>}
        <li className={`pagination__page ${currentPageNumber === pageNumbers[0] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[0]}`}>{pageNumbers[0]}</Link>
        </li>
        {cardsTotalCount > (pageNumbers[0] * CARDS_COUNT_IN_PAGE) &&
          <li className={`pagination__page ${currentPageNumber === pageNumbers[1] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[1]}`}>{pageNumbers[1]}</Link>
          </li>}
        {cardsTotalCount > (pageNumbers[1] * CARDS_COUNT_IN_PAGE) &&
          <li className={`pagination__page ${currentPageNumber === pageNumbers[2] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[2]}`}>{pageNumbers[2]}</Link>
          </li>}
        {cardsTotalCount > (pageNumbers[2] * CARDS_COUNT_IN_PAGE) &&
          <li className="pagination__page pagination__page--next" id="next"><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[2] + 1}`} onClick={onNextButtonClick}>Далее</Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
