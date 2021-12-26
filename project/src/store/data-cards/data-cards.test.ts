import { mockGuitars } from '../../utils/mocks';
import { setCardsTotalCount, setGuitarCards, setMaxPrice, setMinPrice, setSimilarGuitarCards } from '../actions';
import { dataCards } from './data-cards';

describe('Reducer: dataCards', () => {
  const state = {
    guitarCards: [],
    cardsTotalCount: 0,
    maxPrice: 0,
    minPrice: 0,
    similarGuitarCards : [],
  };
  it('without additional parameters should return initial state', () => {
    expect(dataCards(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });
  it('should update guitarCards by load guitar cards', () => {

    expect(dataCards(state, setGuitarCards(mockGuitars)))
      .toEqual({
        ...state,
        guitarCards: mockGuitars,
      });
  });

  it('should update cardsTotalCount by load guitar cards count', () => {

    const fakeTotalCount = 5;
    expect(dataCards(state, setCardsTotalCount(fakeTotalCount)))
      .toEqual({
        ...state,
        cardsTotalCount: fakeTotalCount,
      });
  });

  it('should update maxPrice by max price in load guitar cards', () => {

    const fakeMaxPrice = 500;
    expect(dataCards(state, setMaxPrice(fakeMaxPrice)))
      .toEqual({
        ...state,
        maxPrice: fakeMaxPrice,
      });
  });

  it('should update minPrice by min price in load guitar cards', () => {

    const fakeMinPrice = 100;
    expect(dataCards(state, setMinPrice(fakeMinPrice)))
      .toEqual({
        ...state,
        minPrice: fakeMinPrice,
      });
  });

  it('should update similarGuitarCards by load guitar cards', () => {

    expect(dataCards(state, setSimilarGuitarCards(mockGuitars)))
      .toEqual({
        ...state,
        similarGuitarCards: mockGuitars,
      });
  });

});
