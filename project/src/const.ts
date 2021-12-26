const enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:number',
  FirstCatalogPage = '/catalog/page_1',
  GuitarScreen = '/guitars/:id',
  NotFoundScreen = '404',
}

const enum ActionType {
  SetGuitarCards = 'data-cards/set-guitar-cards',
  SetCardsTotalCount = 'data-cards/set-cards-total-count',
  SetMaxPrice = 'data-cards/set-max-price',
  SetMinPrice = 'data-cards/set-min-price',
  SetSimilarGuitarCards = 'data-cards/set-similar-guitar-cards',
  SetSortedOptions = 'catalog-screen/set-sorted-options',
  SetFiltesOptions = 'catalog-screen/set-filters-options',
  SetCurrentPageOptions = 'catalog-screen/set-current-page-options',
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
};

export {AppRoute, ActionType, SortOption, RankingOption, GuitarType, stringsInGuitarType};
