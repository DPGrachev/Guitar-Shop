import { createAction } from "@reduxjs/toolkit";
import { ActionType } from "../const";
import { Guitar } from "../types/guitar";

const setGuitarCards = createAction(
  ActionType.SetGuitarCards,
  (cards: Guitar[]) => ({
    payload: {
      guitarCards: cards,
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
    }
  })
)

const setFiltersOptions = createAction(
  ActionType.SetFiltesOptions,
  (params: string) => ({
    payload: {
      filtersOptions: params,
    }
  })
)

const setCurrentPageOptions = createAction(
  ActionType.SetCurrentPageOptions,
  (params: string) => ({
    payload: {
      currentPageOptions: params,
    }
  })
)

export {setGuitarCards, setMaxPrice, setMinPrice, setCardsTotalCount, setSortedOptions, setFiltersOptions, setSimilarGuitarCards, setCurrentPageOptions};
