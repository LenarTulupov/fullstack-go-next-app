'use client';

import { ICard } from "@/types/card.interface";
import Link from "next/link";
import { useState, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite, isFavorite } from "@/store/favorites/favorites-slice";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import FavoriteButton from "../ui/favorite-button/favorite-button";
import CardImage from "../ui/card-image/card-image";
import Price from "../ui/price/price";
import Tooltip from "../ui/tooltip/tooltip";
import Color from "../ui/color/color";
import CardLoader from "../ui/card-image/card-loader";
import { MdShoppingCart } from "react-icons/md";
import ProductContent from "../product-content/product-content";
import Modal from "../ui/modal/modal";
import { IProduct } from "@/types/product.interface";
import CloseButton from "../ui/close-button/close-button";
import { ISize } from "@/types/sizes.interface";
import { addToCart } from "@/store/cart/cart-slice";
import styles from './card.module.scss';

export default function Card({ product, info = true }: ICard) {
  const { id, images, title, price_new, price_old, color } = product;
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [quickViewModal, setQuickViewModal] = useState(false);
  const [sizeChartModal, setSizeChartModal] = useState(false);
  const [selectSizeModal, setSelectSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<null | ISize>(null);
  const [closeProductModal, setCloseProductModal] = useState<boolean>(false);

  const dispatch = useDispatch();
  const isProductFavorite = useSelector((state: RootState) => isFavorite(state, id));

  const firstImage = images[0].image_url;
  const secondImage = images[1].image_url;
  const whichImage = isImageHovered ? secondImage : firstImage;

  const handleImageHover = (event: MouseEvent) => {
    setIsImageHovered(event.type === 'mouseenter');
  };

  const handleImageLoad = () => setIsImageLoading(false);

  const handleToggleFavorite = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(product));
  };

  const openQuickView = () => {
    setCurrentProduct(product);
    setQuickViewModal(true);
  };

  const closeQuickView = () => {
    setQuickViewModal(false);
    setSizeChartModal(false);
  };

  const openSizeChart = () => setSizeChartModal(true);
  const closeSizeChart = () => setSizeChartModal(false);

  const openSelectSizeModal = () => {
    setSelectSizeModal(true)
    setCurrentProduct(product)
  };
  const closeSelectSizeModal = () => setSelectSizeModal(false);

  const handleSelectSize = (size: ISize) => {
    setSelectedSize(size)
    dispatch(addToCart({ product, size }))
    closeSelectSizeModal()
  }

  useEffect(() => {
    const handleResize = () => {
      setCloseProductModal(window.innerWidth <= 1024);
    }
  }, [])

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
            priority={id <= 10}
            onLoad={handleImageLoad}
          />
        </Link>
        <div className={`
          ${styles['quick-view']} 
          ${isImageHovered ? styles['quick-view_opened'] : ''}
        `}>
          <Button
            className={styles['quick-view_opened-button']}
            onClick={openQuickView}
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
      {info && (
        <div className={styles['card__product-info']}>
          <Link href={`/product/${id}`}>
            <Title>{title}</Title>
          </Link>
          <Color color={color} />
          <div className={styles.prices}>
            <Price 
              className={styles.prices__old} 
              price={price_old} 
              old 
            />
            <Price 
              price={price_new} 
              className={styles.prices_active} 
            />
          </div>
          <Button
            variant="black"
            onClick={openSelectSizeModal}
            className={styles.card__button}
          >
            <MdShoppingCart className={styles['card__button-icon']} />
            <span>Add To Cart</span>
          </Button>
        </div>
      )}

      <Modal isOpened={!!(currentProduct && quickViewModal)}>
        {currentProduct && (
          <ProductContent
            closeButton
            product={currentProduct}
            modal
            onClose={closeQuickView}
          />
        )}
      </Modal>

      <Modal 
        isOpened={!!(currentProduct && selectSizeModal)}>
        {currentProduct && (
          <div className={styles.sizes}>
            <div className={styles.sizes__header}>
              <h3>Select Size</h3>
              <CloseButton onClose={closeSelectSizeModal} />
            </div>
            <div className={styles.sizes__flex}>
              {currentProduct.sizes.map((size) => (
                <Button
                  key={size.id}
                  disabled={!size.available}
                  onClick={() => handleSelectSize(size)}
                >
                  {size.abbreviation}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
