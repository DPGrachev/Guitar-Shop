import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function GuitarScreen ():JSX.Element {
  return (
    <>
      <h3>Страница в разработке</h3>
      <button><Link to={AppRoute.Main}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link></button>
    </>
  )
}


export default GuitarScreen;
