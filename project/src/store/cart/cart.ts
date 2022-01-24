import { createReducer } from '@reduxjs/toolkit';
import { PromoCodeStatus } from '../../const';
import { Cart } from '../../types/state';
import { removeGuitarInCart, setDiscont, setGuitarInCart, setNumberOfGuitarInCurt, setPromoCodeStatus } from '../actions';

const initialState: Cart = {
  guitarsInCart: [],
  numberOfGuitarsInCurt: {},
  discont: 0,
  promoCodeStatus: PromoCodeStatus.Default,
};

const cart = createReducer(initialState,(builder) => {
  builder
    .addCase(setGuitarInCart, (state, action) => {
      state.guitarsInCart.push(action.payload.gutarInCart);
    })
    .addCase(setNumberOfGuitarInCurt, (state, action) => {
      state.numberOfGuitarsInCurt[action.payload.guitarID] = action.payload.quantity;
    })
    .addCase(removeGuitarInCart, (state, action) => {
      state.guitarsInCart = state.guitarsInCart.filter((guitar) => guitar.id !== action.payload.gutarInCart.id);
      delete state.numberOfGuitarsInCurt[action.payload.gutarInCart.id];
    })
    .addCase(setDiscont, (state, action) => {
      state.discont = action.payload.discont;
    })
    .addCase(setPromoCodeStatus, (state, action) => {
      state.promoCodeStatus = action.payload.status;
    });
});

export {cart};