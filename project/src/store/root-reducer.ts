import { combineReducers } from 'redux';
import { catalog } from './catalog/catalog';
import { cart } from './cart/cart';
import { dataCards } from './data-cards/data-cards';

const enum NameSpace {
  Data = 'DATA',
  Catalog = 'CATALOG',
  Cart = 'CART',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: dataCards,
  [NameSpace.Catalog]: catalog,
  [NameSpace.Cart]: cart,
});

type RootState = ReturnType<typeof rootReducer>;

export {NameSpace, rootReducer};
export type {RootState};
