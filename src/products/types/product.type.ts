import { TIngredient } from './ingredient.type';

export type TProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  recipe?: TIngredient[];
  img_url?: string;
  createdAt: Date;
  updatedAt: Date;
};
