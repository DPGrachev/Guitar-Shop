import CardsCatalog from "../cards-catalog/cards-catalog";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";
import { useState } from "react";
import { Filters } from "../../types/guitar";
import { useSelector} from 'react-redux';
import { getSortedGuitarCards } from "../../store/data-cards/selectors";

function CatalogScreen ():JSX.Element {
  let guitars = useSelector(getSortedGuitarCards);

  const initialFilters: Filters = {
    priceRange: [0,0],
    guitarType: [],
    stringCount: [],
  };

  const [filters, setFilters] = useState(initialFilters);

  if(!guitars.length){
    return <h1>Загрузка...</h1>
  }

  if(filters.guitarType.length){
    guitars = guitars.filter((guitar) => filters.guitarType.includes(guitar.type));
  }
  if(filters.stringCount.length){
    guitars = guitars.filter((guitar) => filters.stringCount.includes(guitar.stringCount));
  }

  const minPrice = guitars.slice().sort((a,b) => a.price - b.price)[0].price;
  const maxPrice = guitars.slice().sort((a,b) => b.price - a.price)[0].price;

  if(filters.priceRange[1]){
    guitars = guitars.filter((guitar) => (guitar.price >= filters.priceRange[0] && guitar.price <= filters.priceRange[1]));
  }

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
        <Filter range={[minPrice,maxPrice]} setFilters={setFilters}/>
        <Sort />
        <CardsCatalog guitars={guitars}/>
        <Pagination />
      </div>
    </div>
  )
}

export default CatalogScreen;
