import { createReducer } from "@reduxjs/toolkit"
import { setFiltersOptions, setSortedOptions } from "../actions"
import { CatalogScreen } from "../../types/state"

const initialState: CatalogScreen = {
  sortedOptions: '',
  filtersOptions: '',
}

const catalogScreen = createReducer(initialState,(builder) => {
  builder
    .addCase(setSortedOptions, (state, action) => {
      state.sortedOptions = action.payload.sortedOptions;
    })
    .addCase(setFiltersOptions, (state, action) => {
      state.filtersOptions = action.payload.filtersOptions;
    })
})

export {catalogScreen};

