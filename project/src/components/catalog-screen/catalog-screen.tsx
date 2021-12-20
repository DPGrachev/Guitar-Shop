import CardsCatalog from "../cards-catalog/cards-catalog";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getGuitarCards } from "../../store/data-cards/selectors";
import { fetchGuitarCardsAction } from "../../store/api-actions";
import { getParams } from "../../store/catalog-screen/selectors";

function CatalogScreen ():JSX.Element {
  const dispatch = useDispatch();
  const params = useSelector(getParams);

  useEffect(() => {
    dispatch(fetchGuitarCardsAction(params));
  }, [dispatch, params])
  let guitars = useSelector(getGuitarCards);

  if(!guitars.length){
    return <h1>Загрузка...</h1>
  }

  const minPrice = guitars.slice().sort((a,b) => a.price - b.price)[0].price;
  const maxPrice = guitars.slice().sort((a,b) => b.price - a.price)[0].price;
  
  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
        </li>
        <li className="breadcrumbs__item"><a className="link" href="#">Каталог</a>
        </li>
      </ul>
      <div className="catalog">
        <Filter range={[minPrice,maxPrice]}/>
        <Sort />
        <CardsCatalog guitars={guitars}/>
        <Pagination />
      </div>
    </div>
  )
}

export default CatalogScreen;
