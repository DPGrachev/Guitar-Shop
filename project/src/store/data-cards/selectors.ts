import { Guitar } from "../../types/guitar";
import { State } from "../../types/state"
import { NameSpace } from "../root-reducer";
import { createSelector } from 'reselect';
import { getCurrentRankingOption, getCurrentSortOption } from "../catalog-screen/selectors";
import { RankingOption, SortOption } from "../../const";

const getGuitarCards = (state: State): Guitar[] => state[NameSpace.Data].guitarCards;

const getSortedGuitarCards = createSelector(
  getGuitarCards,
  getCurrentRankingOption,
  getCurrentSortOption,
  (guitars, currentRankingOption, currentSortOption) => {
    switch(currentSortOption){
      case SortOption.Default: {
        return guitars;
      }
      case SortOption.Price: {
        if(currentRankingOption === RankingOption.HighToLow){
          return guitars.slice().sort((a,b) => b.price - a.price);
        }
        return guitars.slice().sort((a,b) => a.price - b.price);
      }
      case SortOption.Popular: {
        if(currentRankingOption === RankingOption.HighToLow){
          return guitars.slice().sort((a,b) => b.rating - a.rating);
        }
        return guitars.slice().sort((a,b) => a.rating - b.rating);
      }
    }
  }
)

export {getGuitarCards, getSortedGuitarCards};
