import { Guitar } from './guitar';
import {RootState} from '../store/root-reducer';
import { GuitarType } from '../const';

type State = RootState;

type DataCards = {
  guitarCards: Guitar[],
  cardsTotalCount: number,
  maxPrice: number,
  minPrice: number,
  similarGuitarCards: Guitar[],
}

type CatalogScreen = {
  sortedOptions: string,
  currentPageOptions: string,
  guitarTypeFilter: GuitarType[],
  stringCountFilter: number[],
  priceRangeFilter: [number, number],
}

export type {State, DataCards, CatalogScreen};
