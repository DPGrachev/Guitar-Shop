import { Guitar } from "./guitar";
import {RootState} from '../store/root-reducer';

type State = RootState;

type DataCards = {
  guitarCards: Guitar[];
}

export type {State, DataCards};
