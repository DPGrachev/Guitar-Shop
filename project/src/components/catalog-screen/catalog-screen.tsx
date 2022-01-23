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
import AddInCartPopup from '../add-in-cart-popup/add-in-cart-popup';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import { Guitar } from '../../types/guitar';

function CatalogScreen ():JSX.Element {
  const dispatch = useDispatch();
  const params = useSelector(getFiltersOptions);
  const currentPargeOptions = useSelector(getCurrentPageOptions);
  const currentSortedOption = useSelector(getSortedOptions);
  const guitars = useSelector(getGuitarCards);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isAddInCartForm, setIsAddInCartForm] = useState(false);
  const [guitarForCart, setGuitarForCart] = useState<Guitar | null>(null);
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

  useEffect(() => {
    if(isAddInCartForm){
      window.addEventListener('keydown', handleEscKeydown);
      return function () {
        window.removeEventListener('keydown', handleEscKeydown);
      };
    }
  });

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape'){
      setIsAddInCartForm(false);
    }
  };

  const closeAddInCartForm = () => setIsAddInCartForm(false);

  const openAddInCartForm = (guitar : Guitar) => {
    setGuitarForCart(guitar);
    setIsAddInCartForm(true);
  };

  return (
    <>
      <Header />
      <main className="page-content">
        {isAddInCartForm && guitarForCart &&
          <FocusLock>
            <RemoveScroll>
              <AddInCartPopup guitar={guitarForCart} onCloseButtonClick={closeAddInCartForm} isCatalogScreen/>
            </RemoveScroll>
          </FocusLock>}
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
            {!!guitars.length && <CardsCatalog guitars={guitars} onAddInCartButtonClick={openAddInCartForm}/>}
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
