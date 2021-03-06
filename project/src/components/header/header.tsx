import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getSumGuitarsInCurt } from '../../store/cart/selectors';
import Search from '../search/search';

function Header(): JSX.Element {
  const numberOfGuitarsInCart = useSelector(getSumGuitarsInCurt);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><a className="header__logo logo" href="/"><img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип"/></a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link " to={AppRoute.FirstCatalogPage}>Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <Search />
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {numberOfGuitarsInCart > 0 && <span className="header__cart-count">{numberOfGuitarsInCart}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
