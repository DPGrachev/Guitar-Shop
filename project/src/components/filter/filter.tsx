import { ChangeEvent, useEffect, useState } from "react";
import { GuitarType, stringsInGuitarType } from "../../const";
import { Filters } from "../../types/guitar";

type FilterProps = {
  range: [number, number],
  setFilters: (filter: Filters) => void,
}

function Filter ({range, setFilters}: FilterProps) :JSX.Element {
  const [minPrice, maxPrice] = range;
  const initialFilters: Filters = {
    priceRange: range,
    guitarType: [],
    stringCount: [],
  };

  const [guitarTypeFilter, setGuitarTypeFilter] = useState(initialFilters.guitarType);
  const [stringsCountFilter, setStringsCountFilter] = useState(initialFilters.stringCount);
  const [priceRange , setPriceRange] = useState(initialFilters.priceRange);

  const onGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const type = evt.currentTarget.name as GuitarType;
    if(guitarTypeFilter.includes(type)){
      setGuitarTypeFilter(guitarTypeFilter.filter((guitarType) => guitarType !== type));
      return;
    }
    setGuitarTypeFilter([...guitarTypeFilter, type]);
  }

  const onStringsCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringsCount = parseFloat(evt.currentTarget.name) ;
    if(stringsCountFilter.includes(stringsCount)){
      setStringsCountFilter(stringsCountFilter.filter((count) => count !== stringsCount));
      return;
    }
    setStringsCountFilter([...stringsCountFilter, stringsCount]);
  }

  const onPriceRangeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = Number(evt.currentTarget.value);
    if(evt.currentTarget.name === 'min'){
      if(value > priceRange[1]){
        evt.currentTarget.value = String(priceRange[1]);
        setPriceRange([ priceRange[1] , priceRange[1]]);
        return;
      }
      evt.currentTarget.value = String(Math.max(value, minPrice));
      setPriceRange([Number(evt.currentTarget.value), priceRange[1]]);
      return;
    }
    if(value < priceRange[0]){
      evt.currentTarget.value = String(priceRange[0]);
      setPriceRange([ priceRange[0] , priceRange[0]]);
      return;
    }
    evt.currentTarget.value = String(Math.min(value, maxPrice));
    setPriceRange([ priceRange[0] , Number(evt.currentTarget.value)]);
  }

  const isActive = (value: number) => {
    if(guitarTypeFilter.length){
      let possibleStrings = new Set();
      guitarTypeFilter.forEach((type) => stringsInGuitarType[type].forEach((stringCount) => possibleStrings.add(stringCount)));
      if(!possibleStrings.has(value)){
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    setFilters({
      priceRange: priceRange,
      guitarType: guitarTypeFilter,
      stringCount: stringsCountFilter,
    })
  }, [setFilters, guitarTypeFilter, stringsCountFilter, priceRange])


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={`${minPrice}`} id="priceMin" name="min" onBlur={onPriceRangeChange}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={`${maxPrice}`} id="priceMax" name="max" onBlur={onPriceRangeChange}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name={GuitarType.Acoustic} onChange={onGuitarTypeChange}/>
          <label htmlFor={GuitarType.Acoustic}>Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name={GuitarType.Electric} onChange={onGuitarTypeChange}/>
          <label htmlFor={GuitarType.Electric}>Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name={GuitarType.Ukulele} onChange={onGuitarTypeChange}/>
          <label htmlFor={GuitarType.Ukulele}>Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" onChange={onStringsCountChange} disabled={isActive(4)}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" onChange={onStringsCountChange} disabled={isActive(6)}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" onChange={onStringsCountChange} disabled={isActive(7)}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" onChange={onStringsCountChange} disabled={isActive(12)}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  )
}

export default Filter;
