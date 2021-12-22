import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { AppRoute } from "../../const";
import { setCurrentPageOptions } from "../../store/actions";
import { getCardsTotalCount } from "../../store/data-cards/selectors";

function Pagination () :JSX.Element {
  const CARDS_COUNT_IN_PAGE = 9;
  const initialPagaNumbers = [1,2,3];
  const params = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cardsTotalCount = useSelector(getCardsTotalCount);
  const currentPageNumber = Number(params.number);
  const [pageNumbers, setPageNumbers] = useState(initialPagaNumbers);

  // const isValidPageNumber = (pageNumber: number) => {
  //   return (cardsTotalCount && cardsTotalCount > (pageNumber-1) * CARDS_COUNT_IN_PAGE);
  // }

  // console.log(cardsTotalCount && cardsTotalCount > (currentPageNumber-1) * CARDS_COUNT_IN_PAGE)


  useEffect(()=> {
    dispatch(setCurrentPageOptions(`&_start=${(currentPageNumber - 1) * CARDS_COUNT_IN_PAGE}&_limit=${CARDS_COUNT_IN_PAGE}`))
  },[dispatch, currentPageNumber])

  // if(cardsTotalCount && !(cardsTotalCount > (currentPageNumber-1) * CARDS_COUNT_IN_PAGE)){
  //   navigate(AppRoute.NotFoundScreen);
  // }
  
  const onNextButtonClick = () => {
    setPageNumbers(pageNumbers.map((number) => number += pageNumbers.length))
  }

  const onPrevButtonClick = () => {
    setPageNumbers(pageNumbers.map((number) => number -= pageNumbers.length))
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pageNumbers[0] !== initialPagaNumbers[0] && <li className="pagination__page pagination__page--prev" id="prev"><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[0] - 1}`} onClick={onPrevButtonClick}>Назад</Link>
        </li>}
        <li className={`pagination__page ${currentPageNumber === pageNumbers[0] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[0]}`}>{pageNumbers[0]}</Link>
        </li>
        {cardsTotalCount > (pageNumbers[0] * CARDS_COUNT_IN_PAGE) && <li className={`pagination__page ${currentPageNumber === pageNumbers[1] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[1]}`}>{pageNumbers[1]}</Link>
        </li>}
        {cardsTotalCount > (pageNumbers[1] * CARDS_COUNT_IN_PAGE) && <li className={`pagination__page ${currentPageNumber === pageNumbers[2] ? 'pagination__page--active' : ''}`}><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[2]}`}>{pageNumbers[2]}</Link>
        </li>}
        {cardsTotalCount > (pageNumbers[2] * CARDS_COUNT_IN_PAGE) && <li className="pagination__page pagination__page--next" id="next"><Link className="link pagination__page-link" to={`/catalog/page_${pageNumbers[2] + 1}`} onClick={onNextButtonClick}>Далее</Link>
        </li>}
      </ul>
    </div>
  )
}

export default Pagination;
