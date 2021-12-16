import { createAction } from "@reduxjs/toolkit";
import { ActionType, RankingOption, SortOption } from "../const";
import { Guitar } from "../types/guitar";

const setGuitarCards = createAction(
  ActionType.SetGuitarCards,
  (cards: Guitar[]) => ({
    payload: {
      guitarCards: cards,
    },
  }),
);

const setCurrentSortOption = createAction(
  ActionType.SetCurrentSortOption,
  (sortOption: SortOption) => ({
    payload: {
      currentSortOption: sortOption,
    },
  }),
);

const setCurrentRankingOption = createAction(
  ActionType.SetCurrentRankingOption,
  (rankingOption: RankingOption) => ({
    payload: {
      currentRankingOption: rankingOption,
    },
  }),
);

export {setGuitarCards, setCurrentSortOption, setCurrentRankingOption};
