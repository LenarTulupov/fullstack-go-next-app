'use client'

import Image from 'next/image';
import ZoomImagePopup from '../zoom-image-popup/zoom-image-popup';
import Color from '../ui/color/color';
import Button from '../ui/button/button';
import Price from '../ui/price/price';
import Title from '../ui/title/title';
import { MouseEvent, useEffect, useState } from 'react';
import { IProduct } from '@/types/product.interface';
import CloseButton from '../ui/close-button/close-button';
import styles from './product-content.module.scss';
import FavoriteButton from '../ui/favorite-button/favorite-button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, isFavorite } from '@/store/favorites/favorites-slice';
import { RootState } from '@/store/store';
import { ISize } from '@/types/sizes.interface';
import { addToCart } from '@/store/cart/cart-slice';
import { Carousel } from 'antd';
import SizeChartContent from '../size-chart-content/size-chart-content';
import useSizeChartPopup from '@/hooks/useSizeChartPopup';
import Modal from '../ui/modal/modal';
import { div } from 'framer-motion/client';

interface IProductContent {
  product: IProduct;
  closeButton: boolean;
  onClose?: () => void;
  modal?: boolean;
}

export default function ProductContent({
  product,
  closeButton,
  onClose,
  modal = false }: IProductContent) {
  const [isManeImage, setIsManeImage] = useState<string>(
    product.images[0].image_url
  );
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isSizeChartPopupOpened, toggleSizeChartPopup } = useSizeChartPopup();

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(toggleFavorite(product));
  }

  const handleSelectSize = (size: ISize) => {
    setSelectedSize(size);
    setError(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size before adding to cart.");
      return;
    }
    dispatch(addToCart({ product, size: selectedSize }));
    setError(null);
  };

  const id = product.id;

  const isProductFavorite = useSelector((state: RootState) => isFavorite(state, id));

  const handleImageMain = (image: string) => {
    setIsManeImage(image);
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={`
        ${styles.product__content} 
        ${modal ? styles.product__content_modal : ''}
      `}>
        <div className={`
          ${styles['product__content-images']} 
          ${styles.images}
          `}>
          {!isMobile ? (
            <>
              <div className={styles.images__all}>
                {Array.isArray(product.images) ? (
                  product.images.map((image: { image_url: string }) => (
                    <Image
                      key={image.image_url}
                      alt={product.title}
                      src={image.image_url}
                      className={
                        isManeImage === image.image_url
                          ? styles['images__all_active']
                          : ''
                      }
                      width={0}
                      height={0}
                      layout='responsive'
                      priority
                      onClick={() => handleImageMain(image.image_url)}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className={styles.images__main}>
                <ZoomImagePopup src={isManeImage} alt={product.title} />
              </div>
            </>
          ) : (
            {Array.isArray(product.images) ? (
                  product.images.map((image: { image_url: string }, index: number) => (
                    <div className={styles['carousel-wrapper__image']} key={index}>
                      <Image
                        alt={product.title}
                        src={image.image_url}
                        width={0}
                        height={0}
                        layout="responsive"
                        priority
                      />
                    </div>
          ))}
            // <Carousel
            // className={styles['carousel-wrapper']}
            //   draggable
            //   slidesToShow={4}
            //   infinite={false}
            //   dots={false}
            // >
            //   {Array.isArray(product.images) ? (
            //     product.images.map((image: { image_url: string }, index: number) => (
            //       <div className={styles['carousel-wrapper__image']} key={index}>
            //         <Image
            //           alt={product.title}
            //           src={image.image_url}
            //           width={0}
            //           height={0}
            //           layout="responsive"
            //           priority
            //         />
            //       </div>
            //     ))
            //   ) : (
            //     <p>No images available</p>
            //   )}
            </Carousel>
            // <Carousel
            //   className={styles['carousel-wrapper']}
            //   draggable
            //   slidesToShow={1.3}
            //   infinite={false}
            //   dots={false}
            // >
            //   {Array.isArray(product.images) ? (
            //     product.images.map((image: { image_url: string }, index: number) => (
            //       <div className={styles['carousel-wrapper__image']} key={index}>
            //         <Image
            //           alt={product.title}
            //           src={image.image_url}
            //           width={0}
            //           height={0}
            //           layout="responsive"
            //           priority
            //         />
            //       </div>
            //     ))
            //   ) : (
            //     <p>No images available</p>
            //   )}
            // </Carousel>
          )}
        </div>
        <div className={`
                ${styles['product__content-description']} 
          ${styles.description}
          `}>
          <div className={styles['title-block']}>
            <Title className={styles['title-main']}>
              {product.title}
            </Title>
            {closeButton ? <CloseButton onClose={onClose} /> : null}
          </div>
          <div className={styles.description__color}>
            <div>Color: <span>{product.color}</span></div>
            <Color color={product.color} />
          </div>
          <div className={styles.sizes}>
            {product.sizes.map((size) => (
              <Button
                className={selectedSize?.id === size.id ? styles['sizes-button_active'] : ''}
                key={size.id}
                disabled={!size.available}
                onClick={() => handleSelectSize(size)}
                onTouchStart={() => handleSelectSize(size)}
              >
                {size.abbreviation}
              </Button>
            ))}
          </div>
          <div className={styles.description__prices}>
            <Price
              price={product.price_new}
              className={styles['main-price']}
            />
            <Price
              price={product.price_old}
              className={styles['old-price']}
              old
            />
          </div>

          <button
            className={styles['description__size-button']}
            onClick={toggleSizeChartPopup}
          >
            <Image
              src={'/size.svg'}
              alt="size"
              width={30}
              height={20}
              priority
            />
            <span>Size Chart</span>
          </button>

          <div className={styles['description-text']}>
            <Title className={styles.title}>Description</Title>
            <div className={styles['description-text__text']}>
              {product.description}
            </div>
          </div>
          <div className={styles.buttons}>
            <Button onClick={handleAddToCart}>Add To Cart</Button>
            <FavoriteButton
              onClick={handleToggleFavorite}
              isFavorite={isProductFavorite}
              border
            />
          </div>
        </div>
        <Modal isOpened={isSizeChartPopupOpened}>
          <SizeChartContent onClose={toggleSizeChartPopup} />
        </Modal>
      </div>
    </>
  )
};