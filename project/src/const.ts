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
  Popular = 'Popular',
}

enum RankingOption {
  Default = 'Default',
  LowToHigh = 'Low to high',
  HighToLow = 'High to low',
}

export {AppRoute, ActionType, SortOption, RankingOption};
