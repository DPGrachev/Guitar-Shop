import { createReducer } from "@reduxjs/toolkit"

import { setGuitarCards, setSimilarGuitarCards } from "../actions"
import { DataCards } from "../../types/state"

const initialState: DataCards = {
  guitarCards: [],
  similarGuitarCards : [],
}

const dataCards = createReducer(initialState,(builder) => {
  builder
    .addCase(setGuitarCards, (state, action) => {
      state.guitarCards = action.payload.guitarCards;
    })
    .addCase(setSimilarGuitarCards, (state, action) => {
      state.similarGuitarCards = action.payload.guitarCards;
    })
})

export {dataCards};
