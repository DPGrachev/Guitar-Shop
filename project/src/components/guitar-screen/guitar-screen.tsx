import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';

function GuitarScreen ():JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <h3>Страница в разработке</h3>
        <button><Link to={AppRoute.Main}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link></button>
      </main>
      <Footer />
    </>
  );
}

export default GuitarScreen;
