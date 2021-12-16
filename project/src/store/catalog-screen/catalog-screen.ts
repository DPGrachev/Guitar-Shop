import { createReducer } from "@reduxjs/toolkit"

import { setCurrentRankingOption, setCurrentSortOption } from "../actions"
import { CatalogScreen } from "../../types/state"
import { SortOption, RankingOption } from "../../const"

const initialState: CatalogScreen = {
  currentSortOption: SortOption.Default,
  currentRankingOption: RankingOption.Default,
}

const catalogScreen = createReducer(initialState,(builder) => {
  builder
    .addCase(setCurrentSortOption, (state, action) => {
      state.currentSortOption = action.payload.currentSortOption;
    })
    .addCase(setCurrentRankingOption, (state, action) => {
      state.currentRankingOption = action.payload.currentRankingOption;
    })
})

export {catalogScreen};

