import { createReducer } from '@reduxjs/toolkit';
import { Cart } from '../../types/state';
import { removeGuitarInCart, setGuitarInCart, setNumberOfGuitarInCurt } from '../actions';

const initialState: Cart = {
  guitarsInCart: [],
  numberOfGuitarsInCurt: {},
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
    });
});

export {cart};
