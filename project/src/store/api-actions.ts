import { ThunkActionResult } from "../types/actions";
import { Guitar } from "../types/guitar";
import { setGuitarCards } from "./actions";

const getImageNumber = (str: string) => {
  const imageNumber = str.match(/\d+/);
  if(imageNumber){
    return imageNumber[0];
  }
}

const adaptToClient = (guitar: Guitar) :Guitar => {
  guitar.previewImg = `img/content/catalog-product-${getImageNumber(guitar.previewImg)}`

  return guitar;
}

const fetchGuitarCardsAction = () : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Guitar[]>('/guitars')
      .then((response) => response.data.map((guitar) => adaptToClient(guitar)))
      .then((response) => dispatch(setGuitarCards(response)));
  };


export { fetchGuitarCardsAction };
