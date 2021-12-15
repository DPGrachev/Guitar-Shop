import { combineReducers } from 'redux';
import { dataCards } from './data-cards/data-cards';

const enum NameSpace {
  Data = 'DATA',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: dataCards,
});

type RootState = ReturnType<typeof rootReducer>;

export {NameSpace, rootReducer};
export type {RootState};
