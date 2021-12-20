import {MouseEvent} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RankingOption, SortOption } from '../../const';
import { setCurrentRankingOption, setCurrentSortOption } from '../../store/actions';
import { getCurrentRankingOption, getCurrentSortOption } from '../../store/catalog-screen/selectors';

function Sort() :JSX.Element {
  const dispatch = useDispatch();
  const currentSortOption = useSelector(getCurrentSortOption);
  const currentRankingOption = useSelector(getCurrentRankingOption);

  const onSortOptionClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if(currentRankingOption === RankingOption.Default){
      dispatch(setCurrentRankingOption(RankingOption.LowToHigh));
    }
    dispatch(setCurrentSortOption(evt.currentTarget.dataset.name as SortOption));
  }

  const onRankingOptionClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if(currentSortOption === SortOption.Default){
      dispatch(setCurrentSortOption(SortOption.Price));
    }
    dispatch(setCurrentRankingOption(evt.currentTarget.dataset.name as RankingOption));
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
