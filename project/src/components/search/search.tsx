import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getSimilarGuitarCards } from '../../store/data-cards/selectors';
import {useHistory} from 'react-router-dom';
import { fetchSimilarGuitarCardsAction } from '../../store/api-actions';

function Search (): JSX.Element {
  const similarGuitars = useSelector(getSimilarGuitarCards);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');

  const onTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchSimilarGuitarCardsAction(evt.target.value));
    setSearchText(evt.target.value);
  };

  const onSuitableGuitarClick = (id: number) => {
    history.push(`/guitars/${id}`);
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if(evt.key === 'Enter'){
      history.push(`/guitars/${id}`);
    }
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onChange={onTextChange}/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${similarGuitars.length && searchText.length ? '' : 'hidden'}`} style={{zIndex: 1}}>
        {similarGuitars.map((guitar) => <li key={guitar.id} className="form-search__select-item" tabIndex={0} onClick={() => onSuitableGuitarClick(guitar.id)} onKeyDown={(evt) => onKeyDown(evt, guitar.id)}>{guitar.name}</li>)}
      </ul>
    </div>
  );
}

export default Search;
