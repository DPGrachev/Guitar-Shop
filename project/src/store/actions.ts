import { createAction } from "@reduxjs/toolkit";
import { ActionType } from "../const";
import { Guitar } from "../types/guitar";

const setGuitarCards = createAction(
  ActionType.SetGuitarCards,
  (cards: Guitar[]) => ({
    payload: {
      guitarCards: cards,
    },
  }),
);

export {setGuitarCards};
