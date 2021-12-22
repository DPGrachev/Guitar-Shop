import { State } from "../../types/state"
import { NameSpace } from "../root-reducer"
import { createSelector } from 'reselect';

const getSortedOptions = (state: State): string => state[NameSpace.Catalog].sortedOptions;

const getFiltersOptions = (state: State): string => state[NameSpace.Catalog].filtersOptions;

const getCurrentPageOptions = (state: State): string => state[NameSpace.Catalog].currentPageOptions;

const getParams = createSelector(
  getSortedOptions,
  getFiltersOptions,
  getCurrentPageOptions,
  (sortedOptions, filtersOptions, currentPageOptions) => filtersOptions + sortedOptions + currentPageOptions
)

export { getParams};
