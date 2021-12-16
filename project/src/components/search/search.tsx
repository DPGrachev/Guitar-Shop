import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSelector} from 'react-redux';
import { getGuitarCards } from "../../store/data-cards/selectors";
import { Guitar } from "../../types/guitar";
import {useNavigate} from 'react-router-dom'

function Search (): JSX.Element {
  const guitars = useSelector(getGuitarCards);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const searchSuitableGuitar = (guitars: Guitar[]) => {
    if(searchText && searchText !== ' '){
      return guitars.filter((guitar) => guitar.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    return [];
  }

  const suitableGuitars = searchSuitableGuitar(guitars)

  const onTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  }

  const onSuitableGuitarClick = (id: number) => {
    navigate(`/guitars/${id}`);
  }

  const onKeyDown = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if(evt.key === 'Enter'){
      navigate(`/guitars/${id}`);
    }
  }


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
      <ul className={`form-search__select-list ${suitableGuitars.length ? '' : 'hidden'}`} style={{zIndex: 1}}>
        {suitableGuitars.map((guitar) => <li key={guitar.id} className="form-search__select-item" tabIndex={0} onClick={() => onSuitableGuitarClick(guitar.id)} onKeyDown={(evt) => onKeyDown(evt, guitar.id)}>{guitar.name}</li>)}
      </ul>
    </div>
  )
}

export default Search;
