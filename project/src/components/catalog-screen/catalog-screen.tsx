import CardsCatalog from "../cards-catalog/cards-catalog";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getGuitarCards } from "../../store/data-cards/selectors";
import { fetchGuitarCardsAction } from "../../store/api-actions";
import { getParams } from "../../store/catalog-screen/selectors";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function CatalogScreen ():JSX.Element {
  const dispatch = useDispatch();
  const params = useSelector(getParams);
  const guitars = useSelector(getGuitarCards);

  useEffect(() => {
    if(params){
      dispatch(fetchGuitarCardsAction(params));
    }
  }, [dispatch, params])
  
  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
        </li>
        <li className="breadcrumbs__item"><Link className="link" to={AppRoute.FirstCatalogPage}>Каталог</Link>
        </li>
      </ul>
      <div className="catalog">
        <Filter />
        <Sort />
        {guitars.length ? <CardsCatalog guitars={guitars}/> : <h1>Загрузка...</h1>}
        <Pagination />
      </div>
    </div>
  )
}

export default CatalogScreen;
