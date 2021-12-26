import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchGuitarCardsAction, fetchMaxPriceAction, fetchMinPriceAction, fetchSimilarGuitarCardsAction} from './api-actions';
import {State} from '../types/state';
import {mockGuitars} from '../utils/mocks';
import { setCardsTotalCount, setGuitarCards, setMaxPrice, setMinPrice, setSimilarGuitarCards } from './actions';

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

    await store.dispatch(fetchGuitarCardsAction(fakeParams));

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
      setSimilarGuitarCards(mockGuitars),
    ]);
  });
});
