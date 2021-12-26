import { Route, Switch} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../const';
import CatalogScreen from '../catalog-screen/catalog-screen';
import GuitarScreen from '../guitar-screen/guitar-screen';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen/>
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <CatalogScreen />
      </Route>
      <Route exact path={AppRoute.GuitarScreen}>
        <GuitarScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
