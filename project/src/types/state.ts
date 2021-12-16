import { Guitar } from "./guitar";
import {RootState} from '../store/root-reducer';
import { RankingOption, SortOption } from "../const";

type State = RootState;

type DataCards = {
  guitarCards: Guitar[];
}

type CatalogScreen = {
  currentSortOption: SortOption;
  currentRankingOption: RankingOption;
}

export type {State, DataCards, CatalogScreen};
