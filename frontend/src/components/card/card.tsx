import { ICard } from "@/types/card.interface";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import FavoriteButton from "../ui/favorite-button/favorite-button";
import CardImage from "../ui/card-image/card-image";
import Price from "../ui/price/price";
import Link from "next/link";
import Tooltip from "../ui/tooltip/tooltip";
import { MouseEvent, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import Color from "../ui/color/color";
import useProductPopup from "@/hooks/useProductPopup";
import styles from './card.module.scss'

export default function Card({
  product,
  handleFavorite,
  onClick,
  handleAddedToCart }: ICard) {
  const { id, images, title, price_new, price_old, color } = product;
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const { handleProductPopupToggle } = useProductPopup();

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
  }

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles['image-wrapper']}>
        <Link href={`/product/${id}`} className={styles.card__link}>
          <CardImage
            handleImageHover={handleImageHover}
            src={whichImage}
            alt={title}
            isImageHovered={isImageHovered}
            id={id}
            priority={isPriority}
          />
        </Link>
        <div className={`
          ${styles['quick-view']} 
          ${isImageHovered ? styles['quick-view_opened'] : ''}
          `}>
          <Button onClick={handleProductPopupToggle}>Quick View</Button>
        </div>
      </div>
      <div className={styles['tooltip-wrapper']}>
        <Tooltip position="bottom" content="Add product to cart">
          <FavoriteButton
            onClick={handleFavorite}
            className={styles['card__favorite-button']}
            border={false}
          />
        </Tooltip>
      </div>
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
          onClick={handleAddedToCart}
          className={styles.card__button}
        >
          <MdShoppingCart className={styles['card__button-icon']} />
          <span>Add To Cart</span>
        </Button>
      </div>
    </div>
  )
};
