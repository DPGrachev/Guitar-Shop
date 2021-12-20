const enum AppRoute {
  Main = '/',
  GuitarScreen = '/guitars/:id',
}

const enum ActionType {
  SetGuitarCards = 'data-cards/set-guitar-cards',
  SetCurrentSortOption = 'catalog-screen/set-current-sort-option',
  SetCurrentRankingOption = 'catalog-screen/set-current-ranking-option',
}

enum SortOption {
  Default = 'Default',
  Price = 'Price',
  Rating = 'Rating',
}

enum RankingOption {
  Default = 'Default',
  LowToHigh = 'Low to high',
  HighToLow = 'High to low',
}

enum GuitarType {
  Electric = 'electric',
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
}

const stringsInGuitarType = {
  [GuitarType.Electric] : [4,6,7],
  [GuitarType.Ukulele] : [4],
  [GuitarType.Acoustic] : [6,7,12],
}

export {AppRoute, ActionType, SortOption, RankingOption, GuitarType, stringsInGuitarType};
