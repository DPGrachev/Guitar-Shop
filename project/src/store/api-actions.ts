import { ThunkActionResult } from '../types/actions';
import { Guitar } from '../types/guitar';
import { setCardsTotalCount, setCurrentGuitarCard, setDiscont, setGuitarCards, setMaxPrice, setMinPrice, setPromoCodeStatus, setSimilarGuitarCards } from './actions';
import { toast } from 'react-toastify';
import { CommentPost } from '../types/comment';
import { CouponPost } from '../types/coupon';
import { PromoCodeStatus } from '../const';

const fetchGuitarCardsAction = (params: string, sortedOptions: string, currentPageOptions: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      await api.get<Guitar[]>(`/guitars?_embed=comments${params}${sortedOptions}${currentPageOptions}`)
        .then((response) => {
          dispatch(setCardsTotalCount(Number(response.headers['x-total-count'])));
          dispatch(setGuitarCards(response.data));
        });
    }catch{
      toast.error('Сервер временно недоступен');
    }
  };

const fetchCurrentGuitarCardAction = (id: number) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      await api.get<Guitar>(`/guitars/${id}?_embed=comments`)
        .then((response) => {
          dispatch(setCurrentGuitarCard(response.data));
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
      .then((response) => dispatch(setSimilarGuitarCards(response.data.sort((a,b) => a.name.toLowerCase().indexOf(searchString.toLowerCase()) - b.name.toLowerCase().indexOf(searchString.toLowerCase())))));
  };

const postNewComment = (comment: CommentPost) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      await api.post<Guitar[]>('/comments', comment)
        .then(() => dispatch(fetchCurrentGuitarCardAction(comment.guitarId)));
    }catch{
      toast.error('Сервер временно недоступен, отзыв не может быть отправлен');
    }
  };

const postCoupon = (coupon: CouponPost) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      await api.post('/coupons', coupon)
        .then((response) => {
          dispatch(setDiscont(Number(response.data)));
          dispatch(setPromoCodeStatus(PromoCodeStatus.Succes));
        });
    }catch{
      dispatch(setPromoCodeStatus(PromoCodeStatus.Failed));
    }
  };

export {
  fetchGuitarCardsAction,
  fetchCurrentGuitarCardAction,
  fetchMaxPriceAction,
  fetchMinPriceAction,
  fetchSimilarGuitarCardsAction,
  postNewComment,
  postCoupon
};
