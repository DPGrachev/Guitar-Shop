import { ThunkActionResult } from "../types/actions";
import { Guitar } from "../types/guitar";
import { setGuitarCards } from "./actions";

const fetchGuitarCardsAction = () : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>('/guitars')
      .then((response) => dispatch(setGuitarCards(response.data)));
  };


export { fetchGuitarCardsAction };
