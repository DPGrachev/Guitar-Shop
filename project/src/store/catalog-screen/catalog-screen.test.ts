import { setCurrentPageOptions, setFiltersOptions, setSortedOptions } from '../actions';
import { catalogScreen } from './catalog-screen';

describe('Reducer: catalogScreen', () => {
  const state = {
    sortedOptions: '',
    filtersOptions: '',
    currentPageOptions: '',
  };
  it('without additional parameters should return initial state', () => {
    expect(catalogScreen(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });
  it('should update sortedOptions by current options', () => {
    
    const fakeSortedOptions = 'newSort';
    expect(catalogScreen(state, setSortedOptions(fakeSortedOptions)))
      .toEqual({
        sortedOptions: fakeSortedOptions,
        filtersOptions: '',
        currentPageOptions: '',
      });
  });

  it('should update filtersOptions by current filters', () => {

    const fakeFiltersOptions = 'newFilters';
    expect(catalogScreen(state, setFiltersOptions(fakeFiltersOptions)))
      .toEqual({
        sortedOptions: '',
        filtersOptions: fakeFiltersOptions,
        currentPageOptions: '',
      });
  });

  it('should update currentPageOptions by current page', () => {

    const fakeCurrentPageOptions = 'newpage';
    expect(catalogScreen(state, setCurrentPageOptions(fakeCurrentPageOptions)))
      .toEqual({
        sortedOptions: '',
        filtersOptions: '',
        currentPageOptions: fakeCurrentPageOptions,
      });
  });

});
