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

export {setGuitarCards, setSortedOptions, setFiltersOptions, setSimilarGuitarCards};
