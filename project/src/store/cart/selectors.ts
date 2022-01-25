import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { createSelector } from 'reselect';

const getGuitarsinCurt = (state: State) => state[NameSpace.Cart].guitarsInCart;

const getNumberOfGuitarsInCurt = (state: State) => state[NameSpace.Cart].numberOfGuitarsInCurt;

const getDiscount = (state: State) => state[NameSpace.Cart].discount;

const getPromoCodeStatus = (state: State) => state[NameSpace.Cart].promoCodeStatus;

const getSumGuitarsInCurt = createSelector(
  getNumberOfGuitarsInCurt,
  (numberOfGuitarsInCurt) => Object.values(numberOfGuitarsInCurt).reduce((acc,val) => acc + val, 0),
);

export {getGuitarsinCurt, getNumberOfGuitarsInCurt, getDiscount, getPromoCodeStatus, getSumGuitarsInCurt};
