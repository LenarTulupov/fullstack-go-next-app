import { IImages } from "./product.interface";
import { ISize } from "./sizes.interface";

export interface ICard {
  variable?: "full" | "image";
  id: number;
  title: string;
  price_new: string;
  price_old: string;
  images: IImages[];
  alt: string;
  sizes: ISize[];
  color: string;
  handleFavorite: () => void;
  description: string;
}


