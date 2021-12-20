import { Guitar } from "../../types/guitar";
import { State } from "../../types/state"
import { NameSpace } from "../root-reducer";

const getGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].guitarCards;

const getSimilarGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].similarGuitarCards;

export {getGuitarCards, getSimilarGuitarCards};
