import { ThunkActionResult } from "../types/actions";
import { Guitar } from "../types/guitar";
import { setCardsTotalCount, setGuitarCards, setMaxPrice, setMinPrice, setSimilarGuitarCards } from "./actions";
import { toast } from 'react-toastify';

const fetchGuitarCardsAction = (params: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      await api.get<Guitar[]>(`/guitars?${params}`)
        .then((response) => {
          dispatch(setCardsTotalCount(Number(response.headers['x-total-count'])));
          dispatch(setGuitarCards(response.data));
        });
    }catch{
      toast.error('Сервер временно недоступен');
    }
  };

const fetchMaxPriceAction = (params: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>(`/guitars?${params}&_sort=price&_order=desc&_start=0&_end=1`)
      .then((response) => response.data)
      .then((response) => dispatch(setMaxPrice(response[0].price)));
  };

const fetchMinPriceAction = (params: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>(`/guitars?${params}&_sort=price&_order=asc&_start=0&_end=1`)
      .then((response) => response.data)
      .then((response) => dispatch(setMinPrice(response[0].price)));
  };



const fetchSimilarGuitarCardsAction = (searchString: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>(`/guitars?name_like=${searchString}`)
      .then((response) => dispatch(setSimilarGuitarCards(response.data)));
  };


export { fetchGuitarCardsAction, fetchMaxPriceAction, fetchMinPriceAction, fetchSimilarGuitarCardsAction };
