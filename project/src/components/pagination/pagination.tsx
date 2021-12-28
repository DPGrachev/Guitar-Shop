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
  const MAX_PAGE_BUTTONS_COUNT = 3;

  const params: Params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const cardsTotalCount = useSelector(getCardsTotalCount);
  const [paginationSection, setPaginationSection] = useState(0);

  const currentPageNumber = Number(params.number);
  const maxPagesNumber = cardsTotalCount % CARDS_COUNT_IN_PAGE === 0 ? cardsTotalCount / CARDS_COUNT_IN_PAGE : Math.floor(cardsTotalCount / CARDS_COUNT_IN_PAGE) + 1;
  const pages = new Array(maxPagesNumber).fill('').map((value, i) => value = i+1);
  const currentPages = pages.slice(paginationSection * MAX_PAGE_BUTTONS_COUNT,paginationSection * MAX_PAGE_BUTTONS_COUNT + MAX_PAGE_BUTTONS_COUNT);

  if(cardsTotalCount && !currentPages.includes(currentPageNumber) && pages.includes(currentPageNumber)){
    if(currentPageNumber % MAX_PAGE_BUTTONS_COUNT){
      setPaginationSection(Math.floor(currentPageNumber / MAX_PAGE_BUTTONS_COUNT));
    }else{
      setPaginationSection(currentPageNumber / MAX_PAGE_BUTTONS_COUNT - 1);
    }
  }else if(cardsTotalCount && !pages.includes(currentPageNumber)){
    history.push(AppRoute.FirstCatalogPage);
  }

  useEffect(()=> {
    dispatch(setCurrentPageOptions(`&_start=${(currentPageNumber - 1) * CARDS_COUNT_IN_PAGE}&_limit=${CARDS_COUNT_IN_PAGE}`));
  },[dispatch, currentPageNumber]);

  const handleNextButtonClick = () => {
    setPaginationSection(paginationSection + 1);
  };

  const handlePrevButtonClick = () => {
    setPaginationSection(paginationSection - 1);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {paginationSection > 0 &&
          <li className="pagination__page pagination__page--prev" id="prev"><Link className="link pagination__page-link" to={`/catalog/page_${currentPages[0] - 1}`} onClick={handlePrevButtonClick}>Назад</Link>
          </li>}
        {currentPages[0] &&
          <li className={`pagination__page ${currentPageNumber === currentPages[0] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${currentPages[0]}`}>{currentPages[0]}</Link>
          </li>}
        {currentPages[1] &&
          <li className={`pagination__page ${currentPageNumber === currentPages[1] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${currentPages[1]}`}>{currentPages[1]}</Link>
          </li>}
        {currentPages[2] &&
          <li className={`pagination__page ${currentPageNumber === currentPages[2] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${currentPages[2]}`}>{currentPages[2]}</Link>
          </li>}
        {pages.includes(currentPages[2]+1) &&
          <li className="pagination__page pagination__page--next" id="next"><Link className="link pagination__page-link" to={`/catalog/page_${currentPages[2] + 1}`} onClick={handleNextButtonClick}>Далее</Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
