import CardsCatalog from '../cards-catalog/cards-catalog';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sort from '../sort/sort';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGuitarCards } from '../../store/data-cards/selectors';
import { fetchGuitarCardsAction } from '../../store/api-actions';
import { getFiltersOptions, getCurrentPageOptions, getSortedOptions } from '../../store/catalog/selectors';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';
import Footer from '../footer/footer';

function CatalogScreen ():JSX.Element {
  const dispatch = useDispatch();
  const params = useSelector(getFiltersOptions);
  const currentPargeOptions = useSelector(getCurrentPageOptions);
  const currentSortedOption = useSelector(getSortedOptions);
  const guitars = useSelector(getGuitarCards);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if(guitars.length && !isDataLoaded){
      setIsDataLoaded(true);
    }
  },[isDataLoaded, guitars]);

  useEffect(() => {
    if(currentPargeOptions){
      dispatch(fetchGuitarCardsAction(params,currentSortedOption, currentPargeOptions));
    }
  }, [dispatch, params, currentSortedOption, currentPargeOptions]);

  useEffect(() => {
    if((params && location.search !== `?${params}`) || (location.search && !params)){
      history.push(`?${params}`);
    }
  }, [params, location, history]);

  return (
    <>
      <Header />
      <main className="page-content">
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
            {!!guitars.length && <CardsCatalog guitars={guitars}/>}
            {!guitars.length && isDataLoaded && <h1>Не удалось найти подходящих гитар</h1>}
            {!isDataLoaded && <h1>Загрузка...</h1>}
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogScreen;
