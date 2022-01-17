import { combineReducers } from 'redux';
import { catalog } from './catalog/catalog';
import { dataCards } from './data-cards/data-cards';

const enum NameSpace {
  Data = 'DATA',
  Catalog = 'CATALOG',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: dataCards,
  [NameSpace.Catalog]: catalog,
});

type RootState = ReturnType<typeof rootReducer>;

export {NameSpace, rootReducer};
export type {RootState};
