import { ICard } from "@/types/card.interface";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import FavoriteButton from "../ui/favorite-button/favorite-button";
import CardImage from "../ui/card-image/card-image";
import Price from "../ui/price/price";
import Link from "next/link";
import Tooltip from "../ui/tooltip/tooltip";
import PopupItems from "../popup-items/poput-items";
import { MouseEvent, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import Color from "../ui/color/color";
import PopupPage from "../popup-page/popup-page";
import styles from './card.module.scss'

export default function Card({
  id,
  images,
  alt,
  title,
  sizes,
  price_new,
  price_old,
  color,
  handleFavorite,
  description }: ICard) {
  const [isAddToCartClick, setIsAddToCartClick] = useState<boolean>(false);
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [isPopupPageOpened, setIsPopupPageOpened] = useState<boolean>(false);

  const firstImage = images[0].image_url;
  const secondImage = images[1].image_url;
  const whichImage = isImageHovered ? secondImage : firstImage;

  const handleAddToCartClick = () => {
    setIsAddToCartClick(p => !p);
  }

  const handlePopupPageOpened = () => {
    setIsPopupPageOpened(p => !p);
  }

  const handleImageHover = (event: MouseEvent) => {
    if (event.type === 'mouseenter') {
      setIsImageHovered(true);
    } else if (event.type === 'mouseleave') {
      setIsImageHovered(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <Link href={`/product/${id}`} className={styles.card__link}>
          <CardImage
            handleImageHover={handleImageHover}
            src={whichImage}
            alt={alt}
            isImageHovered={isImageHovered}
            id={id}
          />
        </Link>
        <div className={`
          ${styles['quick-view']} 
          ${isImageHovered ? styles['quick-view_opened'] : ''}
          `}>
          <Button onClick={handlePopupPageOpened}>Quick View</Button>
        </div>
      </div>
      <div className={styles['tooltip-wrapper']}>
        <Tooltip position="bottom" content="Add product to cart">
          <FavoriteButton
            onClick={handleFavorite}
            className={styles['card__favorite-button']} />
        </Tooltip>
      </div>
      <div className={styles['card__product-info']}>
        <Link href={`/product/${id}`}>
          <Title>{title}</Title>
        </Link>
        <Color color={color} />
        <div className={styles.prices}>
          <Price className={styles.prices__old} price={price_old} />
          <Price price={price_new} />
        </div>
        <Button
          variant='black'
          onClick={handleAddToCartClick}
          className={styles.card__button}
        >
          <MdShoppingCart className={styles['card__button-icon']} />
          <span>Add To Cart</span>
        </Button>
      </div>
      <PopupItems
        items={sizes}
        handleAddToCartClick={handleAddToCartClick}
        isAddToCartClick={isAddToCartClick}
      />
      <PopupPage
        handlePopupPageOpened={handlePopupPageOpened}
        isPopupPageOpened={isPopupPageOpened}
        product={{
          id,
          title,
          images,
          price_new,
          price_old,
          color,
          sizes,
          description,
          product_colors: [],
          thumbnail: images[0].image_url
        }} />
    </div>
  )
};
