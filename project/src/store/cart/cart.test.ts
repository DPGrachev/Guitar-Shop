import { PromoCodeStatus } from '../../const';
import { mockGuitarCard } from '../../utils/mocks';
import { removeGuitarInCart, setDiscount, setGuitarInCart, setNumberOfGuitarInCurt, setPromoCodeStatus } from '../actions';
import { cart } from './cart';

describe('Reducer: cart', () => {
  const state = {
    guitarsInCart: [],
    numberOfGuitarsInCurt: {},
    discount: 0,
    promoCodeStatus: PromoCodeStatus.Default,
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
      discount: 0,
      promoCodeStatus: PromoCodeStatus.Default,
    };
    expect(cart(newState, removeGuitarInCart(mockGuitarCard)))
      .toEqual({
        ...newState,
        guitarsInCart: [],
        numberOfGuitarsInCurt: {},
      });
  });

  it('should update discont by load discont', () => {
    const fakeDiscont = 20;
    expect(cart(state, setDiscount(fakeDiscont)))
      .toEqual({
        ...state,
        discont: fakeDiscont,
      });
  });

  it('should update promo code status', () => {
    const fakeStatus = PromoCodeStatus.Succes;
    expect(cart(state, setPromoCodeStatus(fakeStatus)))
      .toEqual({
        ...state,
        promoCodeStatus: fakeStatus,
      });
  });

});
