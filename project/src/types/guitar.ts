import { GuitarType } from '../const';
import { Comment } from './comment';

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
  comments: Comment[],
}

type Filters = {
  priceRange: [number, number],
  guitarType: GuitarType[],
  stringCount: number[],
}

export type {Guitar, Filters};
