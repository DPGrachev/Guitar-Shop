import { GuitarType } from '../../const';
import { setCurrentPageOptions, setGuitarTypeFilter, setPriceRangeFilter, setSortedOptions, setStringsCountFilter } from '../actions';
import { catalog } from './catalog';

describe('Reducer: catalog', () => {
  const state = {
    sortedOptions: '',
    currentPageOptions: '',
    guitarTypeFilter: [],
    stringCountFilter: [],
    priceRangeFilter: [0, 0] as [number, number],
  };
  it('without additional parameters should return initial state', () => {
    expect(catalog(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });
  it('should update sortedOptions by current options', () => {

    const fakeSortedOptions = 'newSort';
    expect(catalog(state, setSortedOptions(fakeSortedOptions)))
      .toEqual({
        sortedOptions: fakeSortedOptions,
        currentPageOptions: '',
        guitarTypeFilter: [],
        stringCountFilter: [],
        priceRangeFilter: [0, 0],
      });
  });

  it('should update currentPageOptions by current page', () => {

    const fakeCurrentPageOptions = 'newpage';
    expect(catalog(state, setCurrentPageOptions(fakeCurrentPageOptions)))
      .toEqual({
        sortedOptions: '',
        currentPageOptions: fakeCurrentPageOptions,
        guitarTypeFilter: [],
        stringCountFilter: [],
        priceRangeFilter: [0, 0],
      });
  });

  it('should update guitarTypeFilter by current guitarTypes', () => {

    const fakeGuitarTypes = [GuitarType.Electric, GuitarType.Ukulele];
    expect(catalog(state, setGuitarTypeFilter(fakeGuitarTypes)))
      .toEqual({
        sortedOptions: '',
        currentPageOptions: '',
        guitarTypeFilter: fakeGuitarTypes,
        stringCountFilter: [],
        priceRangeFilter: [0, 0],
      });
  });

  it('should update stringCountFilter by current stringCounts', () => {

    const fakeStringCountFilter = [4,6,7];
    expect(catalog(state, setStringsCountFilter(fakeStringCountFilter)))
      .toEqual({
        sortedOptions: '',
        currentPageOptions: '',
        guitarTypeFilter: [],
        stringCountFilter: fakeStringCountFilter,
        priceRangeFilter: [0, 0],
      });
  });

  it('should update priceRangeFilter by current price range', () => {

    const fakePriceRange = [10,100] as [number,number];
    expect(catalog(state, setPriceRangeFilter(fakePriceRange)))
      .toEqual({
        sortedOptions: '',
        currentPageOptions: '',
        guitarTypeFilter: [],
        stringCountFilter: [],
        priceRangeFilter: fakePriceRange,
      });
  });
});
