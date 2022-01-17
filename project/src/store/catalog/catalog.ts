import { createReducer } from '@reduxjs/toolkit';
import { setGuitarTypeFilter, setStringsCountFilter, setCurrentPageOptions, setPriceRangeFilter, setSortedOptions } from '../actions';
import { CatalogScreen } from '../../types/state';
import { GuitarType } from '../../const';

const urlParams = new URLSearchParams(window.location.search);
const initialGuitarTypes = urlParams.getAll('type') as GuitarType[];
const initialScrtingCount = urlParams.getAll('stringCount').map((value) => Number(value));
const initialMinPrice = Number(urlParams.get('price_gte'));
const initialMaxPrice = Number(urlParams.get('price_lte'));

const initialState: CatalogScreen = {
  sortedOptions: '',
  currentPageOptions: '',
  guitarTypeFilter: initialGuitarTypes,
  stringCountFilter: initialScrtingCount,
  priceRangeFilter: [initialMinPrice, initialMaxPrice],
};

const catalog = createReducer(initialState,(builder) => {
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

export {catalog};

