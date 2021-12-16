import { combineReducers } from 'redux';
import { catalogScreen } from './catalog-screen/catalog-screen';
import { dataCards } from './data-cards/data-cards';

const enum NameSpace {
  Data = 'DATA',
  Catalog = 'CATALOG',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: dataCards,
  [NameSpace.Catalog]: catalogScreen,
});

type RootState = ReturnType<typeof rootReducer>;

export {NameSpace, rootReducer};
export type {RootState};
