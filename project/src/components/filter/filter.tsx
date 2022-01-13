import { ChangeEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarType, stringsInGuitarType } from '../../const';
import { setGuitarTypeFilter, setStringsCountFilter, setPriceRangeFilter } from '../../store/actions';
import { fetchMaxPriceAction, fetchMinPriceAction } from '../../store/api-actions';
import { getGuitarTypeFilter, getPriceRangeFilter, getStringCountFilter } from '../../store/catalog-screen/selectors';
import { getMaxPrice, getMinPrice } from '../../store/data-cards/selectors';

function Filter () :JSX.Element {
  const dispatch = useDispatch();
  const maxPrice = useSelector(getMaxPrice);
  const minPrice = useSelector(getMinPrice);
  const guitarTypeFilter = useSelector(getGuitarTypeFilter);
  const stringsCountFilter = useSelector(getStringCountFilter);
  const priceRange = useSelector(getPriceRangeFilter);

  const maxPriceField = useRef<HTMLInputElement>(null);
  const minPriceField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchMaxPriceAction(guitarTypeFilter.map((type) => `&type=${type}`).join('') + stringsCountFilter.map((value) => `&stringCount=${value}`).join('')));
    dispatch(fetchMinPriceAction(guitarTypeFilter.map((type) => `&type=${type}`).join('') + stringsCountFilter.map((value) => `&stringCount=${value}`).join('')));
  },[dispatch, guitarTypeFilter, stringsCountFilter]);

  const handleGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let checkedStringsCountFilter = stringsCountFilter;
    const type = evt.currentTarget.name as GuitarType;
    if(guitarTypeFilter.includes(type)){
      dispatch(setGuitarTypeFilter(guitarTypeFilter.filter((guitarType) => guitarType !== type)));
      return;
    }
    checkedStringsCountFilter.forEach((stringsCount) => {

      if(!stringsInGuitarType[type].includes(stringsCount)){
        checkedStringsCountFilter = checkedStringsCountFilter.filter((count) => count !== stringsCount);
      }
    });
    dispatch(setStringsCountFilter(checkedStringsCountFilter));
    dispatch(setGuitarTypeFilter([...guitarTypeFilter, type]));
  };

  const handleStringsCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringsCount = parseFloat(evt.currentTarget.name) ;
    if(stringsCountFilter.includes(stringsCount)){
      dispatch(setStringsCountFilter(stringsCountFilter.filter((count) => count !== stringsCount)));
      return;
    }
    dispatch(setStringsCountFilter([...stringsCountFilter, stringsCount]));
  };

  const handlePriceRangeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    if(evt.currentTarget.name === 'min'){
      if(!value){
        dispatch(setPriceRangeFilter([ 0 , priceRange[1]]));
        return;
      }
      if(priceRange[1] && value > priceRange[1]){
        evt.currentTarget.value = String(priceRange[1]);
        dispatch(setPriceRangeFilter([ priceRange[1] , priceRange[1]]));
        return;
      }
      if( value > maxPrice){
        evt.currentTarget.value = String(maxPrice);
        dispatch(setPriceRangeFilter([ maxPrice , priceRange[1]]));
        return;
      }
      evt.currentTarget.value = String(Math.max(value, minPrice));
      dispatch(setPriceRangeFilter([Number(evt.currentTarget.value), priceRange[1]]));
      return;
    }
    if(!value){
      dispatch(setPriceRangeFilter([priceRange[0] ,  0]));
      return;
    }
    if(value < priceRange[0]){
      evt.currentTarget.value = String(priceRange[0]);
      dispatch(setPriceRangeFilter([ priceRange[0] , priceRange[0]]));
      return;
    }
    if(value < minPrice){
      evt.currentTarget.value = String(minPrice);
      dispatch(setPriceRangeFilter([ priceRange[0] , minPrice]));
      return;
    }
    evt.currentTarget.value = String(Math.min(value, maxPrice));
    dispatch(setPriceRangeFilter([ priceRange[0] , Number(evt.currentTarget.value)]));
  };

  const isActive = (value: number) => {
    if(guitarTypeFilter.length){
      const possibleStrings = new Set();
      guitarTypeFilter.forEach((type) => stringsInGuitarType[type].forEach((stringCount) => possibleStrings.add(stringCount)));
      if(possibleStrings.has(value)){
        return true;
      }
      return false;
    }
    return true;
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input ref={minPriceField} type="number" placeholder={`${minPrice}`} id="priceMin" name="min" onBlur={handlePriceRangeChange} defaultValue={priceRange[0] ? priceRange[0] : ''}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input ref={maxPriceField} type="number" placeholder={`${maxPrice}`} id="priceMax" name="max" onBlur={handlePriceRangeChange} defaultValue={priceRange[1] ? priceRange[1] : ''}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name={GuitarType.Acoustic} onChange={handleGuitarTypeChange} checked={guitarTypeFilter.includes(GuitarType.Acoustic)}/>
          <label htmlFor={GuitarType.Acoustic}>Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name={GuitarType.Electric} onChange={handleGuitarTypeChange} checked={guitarTypeFilter.includes(GuitarType.Electric)}/>
          <label htmlFor={GuitarType.Electric}>Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name={GuitarType.Ukulele} onChange={handleGuitarTypeChange} checked={guitarTypeFilter.includes(GuitarType.Ukulele)}/>
          <label htmlFor={GuitarType.Ukulele}>Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" onChange={handleStringsCountChange} disabled={!isActive(4)} checked={stringsCountFilter.includes(4)}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" onChange={handleStringsCountChange} disabled={!isActive(6)} checked={stringsCountFilter.includes(6)}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" onChange={handleStringsCountChange} disabled={!isActive(7)} checked={stringsCountFilter.includes(7)}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" onChange={handleStringsCountChange} disabled={!isActive(12)} checked={stringsCountFilter.includes(12)}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
