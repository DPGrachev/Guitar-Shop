const enum AppRoute {
  Main = '/',
  GuitarScreen = '/guitars/:id',
}

const enum ActionType {
  SetGuitarCards = 'data-cards/set-guitar-cards',
  SetSimilarGuitarCards = 'data-cards/set-similar-guitar-cards',
  SetSortedOptions = 'catalog-screen/set-sorted-options',
  SetFiltesOptions = 'catalog-screen/set-filters-options',
}

enum SortOption {
  Default = 'Default',
  Price = 'price',
  Rating = 'rating',
}

enum RankingOption {
  Default = 'Default',
  LowToHigh = 'asc',
  HighToLow = 'desc',
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
