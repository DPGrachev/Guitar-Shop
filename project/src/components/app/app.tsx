import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NotFoundScreen from "../not-found-screen/not-found-screen";
import { AppRoute } from "../../const";
import CatalogScreen from "../catalog-screen/catalog-screen";
import GeneralWrapper from '../general-wrapper/general-wrapper';
import GuitarScreen from '../guitar-screen/guitar-screen';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* <Route path={AppRoute.Main} element={<GeneralWrapper/>}> */}
        <Route path={AppRoute.Main} element={<GeneralWrapper/>}>
          <Route index element={<MainScreen/>}/>
          <Route path={AppRoute.Catalog} element={<CatalogScreen />}/>
          <Route path={AppRoute.GuitarScreen} element={<GuitarScreen />}/>
        </Route>
        <Route path="*" element={<NotFoundScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;
