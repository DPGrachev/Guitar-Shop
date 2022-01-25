import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchCurrentGuitarCardAction, fetchGuitarCardsAction, fetchMaxPriceAction, fetchMinPriceAction, fetchSimilarGuitarCardsAction, postCoupon, postNewComment} from './api-actions';
import {State} from '../types/state';
import {mockGuitarCard, mockGuitars} from '../utils/mocks';
import { setCardsTotalCount, setCurrentGuitarCard, setDiscount, setGuitarCards, setMaxPrice, setMinPrice, setPromoCodeStatus, setSimilarGuitarCards } from './actions';
import { PromoCodeStatus } from '../const';

describe('Async actions', () => {

  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch setCardsTotalCount and setGuitarCards when GET /guitars?_embed=comments:params', async () => {
    const store = mockStore();
    const fakeParams = '_start=10&_end=20';
    mockAPI
      .onGet(`/guitars?_embed=comments${fakeParams}`)
      .reply(200, mockGuitars, {'x-total-count' : mockGuitars.length});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarCardsAction(fakeParams,'',''));

    expect(store.getActions()).toEqual([
      setCardsTotalCount(mockGuitars.length),
      setGuitarCards(mockGuitars),
    ]);
  });

  it('should dispatch setMaxPrice when GET /guitars?params&_sort=price&_order=desc&_start=0&_end=1', async () => {
    const store = mockStore();
    const fakeParams = '';
    mockAPI
      .onGet(`/guitars?${fakeParams}&_sort=price&_order=desc&_start=0&_end=1`)
      .reply(200, mockGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMaxPriceAction(fakeParams));

    expect(store.getActions()).toEqual([
      setMaxPrice(mockGuitars[0].price),
    ]);
  });

  it('should dispatch setMinPrice when GET /guitars?params&_sort=price&_order=asc&_start=0&_end=1', async () => {
    const store = mockStore();
    const fakeParams = '';
    mockAPI
      .onGet(`/guitars?${fakeParams}&_sort=price&_order=asc&_start=0&_end=1`)
      .reply(200, mockGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMinPriceAction(fakeParams));

    expect(store.getActions()).toEqual([
      setMinPrice(mockGuitars[0].price),
    ]);
  });

  it('should dispatch setSimilarGuitarCards when GET /guitars?name_like=Name', async () => {
    const store = mockStore();
    const fakeName = 'bass';
    mockAPI
      .onGet(`/guitars?name_like=${fakeName}`)
      .reply(200, mockGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimilarGuitarCardsAction(fakeName));

    expect(store.getActions()).toEqual([
      setSimilarGuitarCards(mockGuitars.sort((a,b) => a.name.toLowerCase().indexOf(fakeName.toLowerCase()) - b.name.toLowerCase().indexOf(fakeName.toLowerCase()))),
    ]);
  });

  it('should dispatch setCurrentGuitarCard when Get /guitars/1_embed=comments', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`/guitars/${mockGuitarCard.id}?_embed=comments`)
      .reply(200, mockGuitarCard);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentGuitarCardAction(mockGuitarCard.id));

    expect(store.getActions()).toEqual([
      setCurrentGuitarCard(mockGuitarCard),
    ]);
  });

  it('should dispatch setCurrentGuitarCard when Post /comments', async () => {
    const store = mockStore();
    const fakeComment = {
      userName: 'Саша',
      advantage: 'Хорошо. Очень хорошо.',
      disadvantage: 'Плохо. Очень плохо.',
      comment: 'Неплохо, но дорого.',
      rating: 3,
      guitarId: 1,
    };
    mockAPI
      .onPost('/comments',fakeComment)
      .reply(200);

    mockAPI
      .onGet(`/guitars/${fakeComment.guitarId}?_embed=comments`)
      .reply(200, mockGuitarCard);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postNewComment(fakeComment));

    expect(store.getActions()).toEqual([
      setCurrentGuitarCard(mockGuitarCard),
    ]);
  });

  it('should dispatch setDiscount and setPromoCodeStatus when POST /coupons', async () => {
    const store = mockStore();
    const fakeCoupon = {coupon: 'asdaf'};
    const fakeDiscont = 20;
    mockAPI
      .onPost('/coupons')
      .reply(200, fakeDiscont);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postCoupon(fakeCoupon));

    expect(store.getActions()).toEqual([
      setDiscount(fakeDiscont),
      setPromoCodeStatus(PromoCodeStatus.Success),
    ]);
  });
});
