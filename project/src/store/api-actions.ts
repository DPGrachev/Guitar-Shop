import { ThunkActionResult } from "../types/actions";
import { Guitar } from "../types/guitar";
import { setGuitarCards, setSimilarGuitarCards } from "./actions";

const fetchGuitarCardsAction = (params: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>(`/guitars?${params}`)
      .then((response) => dispatch(setGuitarCards(response.data)));
  };

const fetchSimilarGuitarCardsAction = (searchString: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>(`/guitars?name_like=${searchString}`)
      .then((response) => dispatch(setSimilarGuitarCards(response.data)));
  };


export { fetchGuitarCardsAction, fetchSimilarGuitarCardsAction };
