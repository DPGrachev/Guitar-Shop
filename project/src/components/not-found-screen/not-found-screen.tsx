import { Link } from "react-router-dom";
import { AppRoute } from "../../const";


function NotFoundScreen ():JSX.Element {
  return (
    <>
      <h3>Такой страницы не существует</h3>
      <button><Link to={AppRoute.Main}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link></button>
    </>
  )
}

export default NotFoundScreen;