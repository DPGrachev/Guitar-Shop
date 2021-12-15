import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NotFoundScreen from "../not-found-screen/not-found-screen";
import { AppRoute } from "../../const";
import CatalogScreen from "../catalog-screen/catalog-screen";
import GeneralWrapper from '../general-wrapper/general-wrapper';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Main} element={<GeneralWrapper/>}>
          <Route index element={<CatalogScreen/>}/>
        </Route>
        <Route path="*" element={<NotFoundScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;
