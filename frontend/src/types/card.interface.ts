import {  IProduct } from "./product.interface";

export interface ICard {
  variable?: "full" | "image";
  // id: number;
  // title: string;
  // price_new: string;
  // price_old: string;
  // images: IImages[];
  // alt: string;
  // sizes: ISize[];
  // color: string;
  // description: string;
  product: IProduct;
  handleFavorite?: () => void;
  onClick?: () => void;
  handleSizeSelectPopup?: () => void;
}


