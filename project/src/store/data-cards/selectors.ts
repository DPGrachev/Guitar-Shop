import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].guitarCards;

const getCurrentGuitarCard = (state: State): Guitar | null => state[NameSpace.Data].currentGuitarCard;

const getCardsTotalCount = (state: State): number => state[NameSpace.Data].cardsTotalCount;

const getMaxPrice = (state: State): number => state[NameSpace.Data].maxPrice;

const getMinPrice = (state: State): number => state[NameSpace.Data].minPrice;

const getSimilarGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].similarGuitarCards;

export {getGuitarCards, getCurrentGuitarCard, getMaxPrice, getMinPrice, getCardsTotalCount, getSimilarGuitarCards};
