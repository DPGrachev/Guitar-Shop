import { createReducer } from '@reduxjs/toolkit';
import { PromoCodeStatus } from '../../const';
import { Cart } from '../../types/state';
import { removeGuitarInCart, setDiscount, setGuitarInCart, setNumberOfGuitarInCurt, setPromoCodeStatus } from '../actions';

const initialState: Cart = {
  guitarsInCart: [],
  numberOfGuitarsInCurt: {},
  discount: 0,
  promoCodeStatus: PromoCodeStatus.Default,
};

const cart = createReducer(initialState,(builder) => {
  builder
    .addCase(setGuitarInCart, (state, action) => {
      state.guitarsInCart.push(action.payload.guitarInCart);
    })
    .addCase(setNumberOfGuitarInCurt, (state, action) => {
      state.numberOfGuitarsInCurt[action.payload.guitarID] = action.payload.quantity;
    })
    .addCase(removeGuitarInCart, (state, action) => {
      state.guitarsInCart = state.guitarsInCart.filter((guitar) => guitar.id !== action.payload.guitarInCart.id);
      delete state.numberOfGuitarsInCurt[action.payload.guitarInCart.id];
    })
    .addCase(setDiscount, (state, action) => {
      state.discount = action.payload.discount;
    })
    .addCase(setPromoCodeStatus, (state, action) => {
      state.promoCodeStatus = action.payload.status;
    });
});

export {cart};
