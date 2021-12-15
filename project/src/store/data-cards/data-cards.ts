import { createReducer } from "@reduxjs/toolkit"

import { setGuitarCards } from "../actions"
import { DataCards } from "../../types/state"

const initialState: DataCards = {
  guitarCards: [],
}

const dataCards = createReducer(initialState,(builder) => {
  builder
    .addCase(setGuitarCards, (state, action) => {
      state.guitarCards = action.payload.guitarCards;
    })
})

export {dataCards};
