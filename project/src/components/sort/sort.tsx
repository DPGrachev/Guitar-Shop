import {MouseEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { RankingOption, SortOption } from '../../const';
import { setSortedOptions } from '../../store/actions';

function Sort() :JSX.Element {
  const dispatch = useDispatch();

  const [currentSortOption, setCurrentSortOption] = useState(SortOption.Default);
  const [currentRankingOption, setCurrentRankingOption] = useState(RankingOption.Default);

  const onSortOptionClick = (evt: MouseEvent<HTMLButtonElement>) => {
    let rankingOption = currentRankingOption;
    if(currentRankingOption === RankingOption.Default){
      setCurrentRankingOption(RankingOption.LowToHigh);
      rankingOption = RankingOption.LowToHigh;
    }
    setCurrentSortOption(evt.currentTarget.dataset.name as SortOption);
    dispatch(setSortedOptions(`&_sort=${evt.currentTarget.dataset.name}&_order=${rankingOption}`));
  }

  const onRankingOptionClick = (evt: MouseEvent<HTMLButtonElement>) => {
    let sortOption = currentSortOption;
    if(currentSortOption === SortOption.Default){
      setCurrentSortOption(SortOption.Price);
      sortOption = SortOption.Price;
    }
    setCurrentRankingOption(evt.currentTarget.dataset.name as RankingOption);
    dispatch(setSortedOptions(`&_sort=${sortOption}&_order=${evt.currentTarget.dataset.name}`));
  }

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${currentSortOption === SortOption.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене" tabIndex={-1} data-name={SortOption.Price} onClick={onSortOptionClick}>по цене</button>
        <button className={`catalog-sort__type-button ${currentSortOption === SortOption.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности" data-name={SortOption.Rating} onClick={onSortOptionClick}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${currentRankingOption === RankingOption.LowToHigh ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={-1} data-name={RankingOption.LowToHigh} onClick={onRankingOptionClick}></button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down ${currentRankingOption === RankingOption.HighToLow ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию"data-name={RankingOption.HighToLow} onClick={onRankingOptionClick}></button>
      </div>
    </div>
  )
}

export default Sort;
