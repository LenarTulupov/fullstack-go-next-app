'use client';

import { ICard } from "@/types/card.interface";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite, isFavorite } from "@/store/favorites/favorites-slice";
import useProductPopup from "@/hooks/useProductPopup";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import FavoriteButton from "../ui/favorite-button/favorite-button";
import CardImage from "../ui/card-image/card-image";
import Price from "../ui/price/price";
import Tooltip from "../ui/tooltip/tooltip";
import Color from "../ui/color/color";
import CardLoader from "../ui/card-image/card-loader";
import { MdShoppingCart } from "react-icons/md";
import styles from './card.module.scss';
import ProductContent from "../product-content/product-content";
import Modal from "../ui/modal/modal";
import { IProduct } from "@/types/product.interface";

export default function Card({
  product,
  handleSizeSelectPopup,
  info = true }: ICard) {
  const { id, images, title, price_new, price_old, color } = product;
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const dispatch = useDispatch();

  const isProductFavorite = useSelector((state: RootState) => isFavorite(state, id));

  const firstImage = images[0].image_url;
  const secondImage = images[1].image_url;
  const whichImage = isImageHovered ? secondImage : firstImage;
  const isPriority = id <= 10;

  const handleImageHover = (event: MouseEvent) => {
    if (event.type === 'mouseenter') {
      setIsImageHovered(true);
    } else if (event.type === 'mouseleave') {
      setIsImageHovered(false);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleToggleFavorite = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(product));
  };

  const handleCurrentProduct = (product: IProduct | null) => {
    setCurrentProduct(product);
  }

  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <Link href={`/product/${id}`} className={styles.card__link}>
          {isImageLoading && <CardLoader />}
          <CardImage
            handleImageHover={handleImageHover}
            src={whichImage}
            alt={title}
            isImageHovered={isImageHovered}
            priority={isPriority}
            onLoad={handleImageLoad}
          />
        </Link>
        <div className={`
          ${styles['quick-view']} 
          ${isImageHovered ? styles['quick-view_opened'] : ''}`}
        >
          <Button
            className={styles['quick-view_opened-button']}
            onClick={() => handleCurrentProduct(product)}
          >
            Quick View
          </Button>
        </div>
      </div>
      <div className={styles['tooltip-wrapper']}>
        <Tooltip position="bottom" content="Add product to favorite">
          <FavoriteButton
            onClick={handleToggleFavorite}
            className={styles['card__favorite-button']}
            border={false}
            isFavorite={isProductFavorite}
          />
        </Tooltip>
      </div>
      {info ? (
        <div className={styles['card__product-info']}>
          <Link href={`/product/${id}`}>
            <Title>{title}</Title>
          </Link>
          <Color color={color} />
          <div className={styles.prices}>
            <Price className={styles.prices__old} price={price_old} old />
            <Price price={price_new} className={styles.prices_active} />
          </div>
          <Button
            variant='black'
            onClick={handleSizeSelectPopup}
            className={styles.card__button}
          >
            <MdShoppingCart className={styles['card__button-icon']} />
            <span>Add To Cart</span>
          </Button>
        </div>
      ) : null}
      {/* Modal */}
        <Modal isModalOpened={!!currentProduct}>
      {currentProduct && (
          <ProductContent
            product={currentProduct}
            closeButton
            onClick={() => handleCurrentProduct(null)}
            modal
          />
        </Modal>
      )}
    </div>
  );
}
