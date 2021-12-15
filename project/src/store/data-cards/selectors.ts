import { Guitar } from "../../types/guitar";
import { DataCards } from "../../types/state"

export const getGuitarCards = (state: DataCards): Guitar[] => state.guitarCards;