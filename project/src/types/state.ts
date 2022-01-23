import { Guitar } from './guitar';
import {RootState} from '../store/root-reducer';
import { GuitarType, PromoCodeStatus } from '../const';

type State = RootState;

type DataCards = {
  guitarCards: Guitar[],
  currentGuitarCard: Guitar | null,
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

type Cart = {
  guitarsInCart: Guitar[],
  numberOfGuitarsInCurt: {
    [key: number]: number,
  },
  discont: number,
  promoCodeStatus: PromoCodeStatus,
}

export type {State, DataCards, CatalogScreen, Cart};
