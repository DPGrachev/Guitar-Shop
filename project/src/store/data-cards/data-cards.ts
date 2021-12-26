import { createReducer } from '@reduxjs/toolkit';

import { setCardsTotalCount, setGuitarCards, setMaxPrice, setMinPrice, setSimilarGuitarCards } from '../actions';
import { DataCards } from '../../types/state';

const initialState: DataCards = {
  guitarCards: [],
  cardsTotalCount: 0,
  maxPrice: 0,
  minPrice: 0,
  similarGuitarCards : [],
};

const dataCards = createReducer(initialState,(builder) => {
  builder
    .addCase(setGuitarCards, (state, action) => {
      state.guitarCards = action.payload.guitarCards;
    })
    .addCase(setCardsTotalCount, (state, action) => {
      state.cardsTotalCount = action.payload.cardsTotalCount;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload.minPrice;
    })
    .addCase(setSimilarGuitarCards, (state, action) => {
      state.similarGuitarCards = action.payload.guitarCards;
    });
});

export {dataCards};
