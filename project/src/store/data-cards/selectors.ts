import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].guitarCards;

const getCardsTotalCount = (state: State): number => state[NameSpace.Data].cardsTotalCount;

const getMaxPrice = (state: State): number => state[NameSpace.Data].maxPrice;

const getMinPrice = (state: State): number => state[NameSpace.Data].minPrice;

const getSimilarGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].similarGuitarCards;

export {getGuitarCards, getMaxPrice, getMinPrice, getCardsTotalCount, getSimilarGuitarCards};
