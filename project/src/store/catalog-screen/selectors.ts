import { State } from "../../types/state"
import { NameSpace } from "../root-reducer"
import { createSelector } from 'reselect';

const getSortedOptions = (state: State): string => state[NameSpace.Catalog].sortedOptions;

const getFiltersOptions = (state: State): string => state[NameSpace.Catalog].filtersOptions;

const getParams = createSelector(
  getSortedOptions,
  getFiltersOptions,
  (sortedOptions, filtersOptions) => filtersOptions + sortedOptions
)

export { getParams};
