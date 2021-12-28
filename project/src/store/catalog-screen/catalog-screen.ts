import { createReducer } from '@reduxjs/toolkit';
import { setGuitarTypeFilter, setStringsCountFilter, setCurrentPageOptions, setPriceRangeFilter, setSortedOptions } from '../actions';
import { CatalogScreen } from '../../types/state';

const initialState: CatalogScreen = {
  sortedOptions: '',
  currentPageOptions: '',
  guitarTypeFilter: [],
  stringCountFilter: [],
  priceRangeFilter: [0, 0],
};

const catalogScreen = createReducer(initialState,(builder) => {
  builder
    .addCase(setSortedOptions, (state, action) => {
      state.sortedOptions = action.payload.sortedOptions;
    })
    .addCase(setCurrentPageOptions, (state, action) => {
      state.currentPageOptions = action.payload.currentPageOptions;
    })
    .addCase(setGuitarTypeFilter, (state, action) => {
      state.guitarTypeFilter = action.payload.currentGuitarType;
    })
    .addCase(setStringsCountFilter, (state, action) => {
      state.stringCountFilter = action.payload.currentStringsCount;
    })
    .addCase(setPriceRangeFilter, (state, action) => {
      state.priceRangeFilter = action.payload.priceRange;
    });
});

export {catalogScreen};

