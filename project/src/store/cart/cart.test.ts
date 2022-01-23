import { mockGuitarCard } from '../../utils/mocks';
import { removeGuitarInCart, setGuitarInCart, setNumberOfGuitarInCurt } from '../actions';
import { cart } from './cart';

describe('Reducer: cart', () => {
  const state = {
    guitarsInCart: [],
    numberOfGuitarsInCurt: {},
  };
  it('without additional parameters should return initial state', () => {
    expect(cart(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });
  it('should update guitarsInCart by added guitar card', () => {

    expect(cart(state, setGuitarInCart(mockGuitarCard)))
      .toEqual({
        ...state,
        guitarsInCart: [mockGuitarCard],
      });
  });

  it('should update numberOfGuitarsInCurt by added quantity guitar cards', () => {
    const fakeGuitarId = 1;
    const fakeQuantity = 5;
    expect(cart(state, setNumberOfGuitarInCurt(fakeGuitarId, fakeQuantity)))
      .toEqual({
        ...state,
        numberOfGuitarsInCurt: {[fakeGuitarId] : fakeQuantity},
      });
  });

  it('should remove guitar in guitarsInCart and numberOfGuitarsInCurt', () => {
    const newState = {
      guitarsInCart: [mockGuitarCard],
      numberOfGuitarsInCurt: {[mockGuitarCard.id] : 1},
    };
    expect(cart(newState, removeGuitarInCart(mockGuitarCard)))
      .toEqual({
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      });
  });

});
