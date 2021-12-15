import CardsCatalog from "../cards-catalog/cards-catalog";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";

function CatalogScreen ():JSX.Element {
  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
        </li>
        <li className="breadcrumbs__item"><a className="link">Каталог</a>
        </li>
      </ul>
      <div className="catalog">
        <Filter />
        <Sort />
        <CardsCatalog />
        <Pagination />
      </div>
    </div>
  )
}

export default CatalogScreen;
