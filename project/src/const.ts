const enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:number',
  Cart = '/cart',
  FirstCatalogPage = '/catalog/page_1',
  GuitarScreen = '/guitars/:id',
  NotFoundScreen = '404',
}

const enum ActionType {
  SetGuitarCards = 'data-cards/set-guitar-cards',
  setCurrentGuitarCard = 'data-cards/set-current-guitar-card',
  SetCardsTotalCount = 'data-cards/set-cards-total-count',
  SetMaxPrice = 'data-cards/set-max-price',
  SetMinPrice = 'data-cards/set-min-price',
  SetSimilarGuitarCards = 'data-cards/set-similar-guitar-cards',
  SetSortedOptions = 'catalog-screen/set-sorted-options',
  SetGuitarTypeFilter = 'catalog-screen/set-guitar-type-filter',
  SetStringsCountFilter = 'catalog-screen/set-strings-count-filter',
  SetPriceRangeFilter = 'catalog-screen/set-price-range-filter',
  SetFiltesOptions = 'catalog-screen/set-filters-options',
  SetCurrentPageOptions = 'catalog-screen/set-current-page-options',
  SetGuitarInCart = 'cart/set-guitar-in-cart',
  SetNumberOfGuitarInCurt = 'cart/set-number-of-guitar-in-curt',
  RemoveGuitarInCart = 'cart/remove-guitar-in-cart',
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

const GuitarTypeTranslate = {
  [GuitarType.Electric] : 'Электрогитара',
  [GuitarType.Ukulele] : 'Укулеле',
  [GuitarType.Acoustic] : 'Акустическая гитара',
};

const stringsInGuitarType = {
  [GuitarType.Electric] : [4,6,7],
  [GuitarType.Ukulele] : [4],
  [GuitarType.Acoustic] : [6,7,12],
};

const promoCode = [
  {
    name: 'light-333',
    discont: 10,
  },
  {
    name: 'medium-444',
    discont: 15,
  },
  {
    name: 'height-555',
    discont: 20,
  },
];

enum PromoCodeStatus {
  Succes = 'succes',
  Failed = 'failed',
  Default = 'default'
}

export {AppRoute, ActionType, SortOption, RankingOption, GuitarType, GuitarTypeTranslate, stringsInGuitarType, promoCode, PromoCodeStatus};
