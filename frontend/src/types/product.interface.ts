import { ISize } from "./sizes.interface";

export interface IProduct {
  id: number;
  images: IImages[] ;
  price_new: string;
  price_old: string;
  title: string;
  product_colors: IProductColorImages[];
  sizes: ISize[];
  color: string;
  thumbnail: string;
  description: string;
  subcategory: string;
  categories: string[];
  created_at: string;
};

interface IProductColor {
  name: string;
}

interface IProductColorImages {
  product_color_images: IImagePath[];
  color: IProductColor;
}

interface IImagePath {
  image_path: string;
}

export interface IImages {
  id: number;
  image_url: string;
}


