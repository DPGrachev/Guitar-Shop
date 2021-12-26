import { GuitarType } from '../const';

type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: GuitarType,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: [],
}

type Filters = {
  priceRange: [number, number],
  guitarType: GuitarType[],
  stringCount: number[],
}

export type {Guitar, Filters};
