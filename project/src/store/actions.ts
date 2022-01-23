import { createAction } from '@reduxjs/toolkit';
import { ActionType, GuitarType, PromoCodeStatus } from '../const';
import { Guitar } from '../types/guitar';

const setGuitarCards = createAction(
  ActionType.SetGuitarCards,
  (cards: Guitar[]) => ({
    payload: {
      guitarCards: cards,
    },
  }),
);

const setCurrentGuitarCard = createAction(
  ActionType.setCurrentGuitarCard,
  (card: Guitar) => ({
    payload: {
      guitarCard: card,
    },
  }),
);

const setCardsTotalCount = createAction(
  ActionType.SetCardsTotalCount,
  (totalCount: number) => ({
    payload: {
      cardsTotalCount: totalCount,
    },
  }),
);

const setMaxPrice = createAction(
  ActionType.SetMaxPrice,
  (price: number) => ({
    payload: {
      maxPrice: price,
    },
  }),
);

const setMinPrice = createAction(
  ActionType.SetMinPrice,
  (price: number) => ({
    payload: {
      minPrice: price,
    },
  }),
);

const setSimilarGuitarCards = createAction(
  ActionType.SetSimilarGuitarCards,
  (cards: Guitar[]) => ({
    payload: {
      guitarCards: cards,
    },
  }),
);

const setSortedOptions = createAction(
  ActionType.SetSortedOptions,
  (params: string) => ({
    payload: {
      sortedOptions: params,
    },
  }),
);

const setCurrentPageOptions = createAction(
  ActionType.SetCurrentPageOptions,
  (params: string) => ({
    payload: {
      currentPageOptions: params,
    },
  }),
);

const setGuitarTypeFilter = createAction(
  ActionType.SetGuitarTypeFilter,
  (guitarType: GuitarType[]) => ({
    payload: {
      currentGuitarType: guitarType,
    },
  }),
);

const setStringsCountFilter = createAction(
  ActionType.SetStringsCountFilter,
  (stringsCount: number[]) => ({
    payload: {
      currentStringsCount: stringsCount,
    },
  }),
);

const setPriceRangeFilter = createAction(
  ActionType.SetPriceRangeFilter,
  (priceRange: [number,number]) => ({
    payload: {
      priceRange: priceRange,
    },
  }),
);

const setGuitarInCart = createAction(
  ActionType.SetGuitarInCart,
  (guitar: Guitar) => ({
    payload: {
      gutarInCart: guitar,
    },
  }),
);

const setNumberOfGuitarInCurt = createAction(
  ActionType.SetNumberOfGuitarInCurt,
  (guitarID: number, quantity: number) => ({
    payload: {
      guitarID: guitarID,
      quantity: quantity,
    },
  }),
);

const removeGuitarInCart = createAction(
  ActionType.RemoveGuitarInCart,
  (guitar: Guitar) => ({
    payload: {
      gutarInCart: guitar,
    },
  }),
);

const setDiscont = createAction(
  ActionType.SetDiscont,
  (discont: number) => ({
    payload: {
      discont: discont,
    },
  }),
);

const setPromoCodeStatus = createAction(
  ActionType.SetPromoCodeStatus,
  (status: PromoCodeStatus) => ({
    payload: {
      status: status,
    },
  }),
);

export {
  setGuitarCards,
  setCurrentGuitarCard,
  setMaxPrice,
  setMinPrice,
  setCardsTotalCount,
  setSortedOptions,
  setSimilarGuitarCards,
  setCurrentPageOptions,
  setGuitarTypeFilter,
  setStringsCountFilter,
  setPriceRangeFilter,
  setGuitarInCart,
  setNumberOfGuitarInCurt,
  removeGuitarInCart,
  setDiscont,
  setPromoCodeStatus
};
