import { createReducer } from '@reduxjs/toolkit';
import { setCurrentPageOptions, setFiltersOptions, setSortedOptions } from '../actions';
import { CatalogScreen } from '../../types/state';

const initialState: CatalogScreen = {
  sortedOptions: '',
  filtersOptions: '',
  currentPageOptions: '',
};

const catalogScreen = createReducer(initialState,(builder) => {
  builder
    .addCase(setSortedOptions, (state, action) => {
      state.sortedOptions = action.payload.sortedOptions;
    })
    .addCase(setFiltersOptions, (state, action) => {
      state.filtersOptions = action.payload.filtersOptions;
    })
    .addCase(setCurrentPageOptions, (state, action) => {
      state.currentPageOptions = action.payload.currentPageOptions;
    });
});

export {catalogScreen};

