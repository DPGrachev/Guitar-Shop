import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { createSelector } from 'reselect';
import { GuitarType } from '../../const';

const getGuitarTypeFilter = (state: State): GuitarType[] => state[NameSpace.Catalog].guitarTypeFilter;

const getStringCountFilter = (state: State): number[] => state[NameSpace.Catalog].stringCountFilter;

const getPriceRangeFilter = (state: State): [number,number] => state[NameSpace.Catalog].priceRangeFilter;

const getSortedOptions = (state: State): string => state[NameSpace.Catalog].sortedOptions;

const getCurrentPageOptions = (state: State): string => state[NameSpace.Catalog].currentPageOptions;

const getFiltersOptions = createSelector(
  getGuitarTypeFilter,
  getStringCountFilter,
  getPriceRangeFilter,
  (guitarTypes, stringCounts, priceRange) => guitarTypes.map((type) => `&type=${type}`).join('') + stringCounts.map((value) => `&stringCount=${value}`).join('') + (priceRange[0] ? `&price_gte=${priceRange[0]}` : '') + (priceRange[1] ? `&price_lte=${priceRange[1]}` : ''),
);

const getParams = createSelector(
  getSortedOptions,
  getFiltersOptions,
  getCurrentPageOptions,
  (sortedOptions, filtersOptions, currentPageOptions) => filtersOptions + sortedOptions + currentPageOptions,
);

export {getGuitarTypeFilter, getStringCountFilter, getPriceRangeFilter, getParams};
