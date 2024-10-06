import { ICard } from "@/types/card.interface";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import FavoriteButton from "../ui/favorite-button/favorite-button";
import CardImage from "../ui/card-image/card-image";
import Price from "../ui/price/price";
import styles from './card.module.scss'
import Link from "next/link";
import Tooltip from "../ui/tooltip/tooltip";
import PopupItems from "../popup-items/poput-items";
import { useState } from "react";
import { MdShoppingCart } from "react-icons/md";

export default function Card({
  id,
  src,
  alt,
  title,
  sizes,
  price_new,
  price_old }: ICard) {
  const [isAddToCartClick, setIsAddToCartClick] = useState<boolean>(false);

  const handleAddToCartClick = () => {
    setIsAddToCartClick(p => !p);
  }

  return (
    <div className={styles.card}>
      <Link href={`/product/${id}`} className={styles.card__link}>
        <CardImage src={src} alt={alt} />
      </Link>
      <Tooltip position="bottom" content="Add product to cart">
        <FavoriteButton className={styles['card__favorite-button']} />
      </Tooltip>
      <div className={styles['card__product-info']}>
        <Link href={`/product/${id}`}>
          <Title>{title}</Title>
        </Link>
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
    </div>
  )
};
