import { Guitar } from "./guitar";
import {RootState} from '../store/root-reducer';

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
  filtersOptions: string,
  currentPageOptions: string,
}

export type {State, DataCards, CatalogScreen};
