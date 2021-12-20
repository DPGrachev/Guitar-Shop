import { Guitar } from "./guitar";
import {RootState} from '../store/root-reducer';

type State = RootState;

type DataCards = {
  guitarCards: Guitar[],
  similarGuitarCards: Guitar[],
}

type CatalogScreen = {
  sortedOptions: string,
  filtersOptions: string,
}

export type {State, DataCards, CatalogScreen};
