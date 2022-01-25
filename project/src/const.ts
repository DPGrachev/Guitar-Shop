const enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:number',
  Cart = '/cart',
  FirstCatalogPage = '/catalog/page_1',
  GuitarScreen = '/guitars/:id',
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
  SetFiltersOptions = 'catalog-screen/set-filters-options',
  SetCurrentPageOptions = 'catalog-screen/set-current-page-options',
  SetGuitarInCart = 'cart/set-guitar-in-cart',
  SetNumberOfGuitarInCurt = 'cart/set-number-of-guitar-in-curt',
  RemoveGuitarInCart = 'cart/remove-guitar-in-cart',
  SetDiscount = 'cart/set-discount',
  SetPromoCodeStatus = 'cart/set-promo-code-status',
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

enum PromoCodeStatus {
  Success = 'success',
  Failed = 'failed',
  Default = 'default'
}

export {AppRoute, ActionType, SortOption, RankingOption, GuitarType, GuitarTypeTranslate, stringsInGuitarType, PromoCodeStatus};
