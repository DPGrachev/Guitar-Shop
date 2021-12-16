import { RankingOption, SortOption } from "../../const"
import { State } from "../../types/state"
import { NameSpace } from "../root-reducer"

const getCurrentSortOption = (state: State): SortOption => state[NameSpace.Catalog].currentSortOption;

const getCurrentRankingOption = (state: State): RankingOption => state[NameSpace.Catalog].currentRankingOption;

export {getCurrentSortOption, getCurrentRankingOption};
