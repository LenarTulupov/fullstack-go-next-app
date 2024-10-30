import Image from 'next/image';
import ZoomImagePopup from '../zoom-image-popup/zoom-image-popup';
import Color from '../ui/color/color';
import Button from '../ui/button/button';
import Price from '../ui/price/price';
import Title from '../ui/title/title';
// import FavoriteButton from '../ui/favorite-button/favorite-button';
import { MouseEvent, useState } from 'react';
import { IProduct } from '@/types/product.interface';
import CloseButton from '../ui/close-button/close-button';
import useProductPopup from '@/hooks/useProductPopup';
import styles from './product-content.module.scss';
import FavoriteButton from '../ui/favorite-button/favorite-button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, isFavorite } from '@/store/favorites/favoritesSlice';
import { RootState } from '@/store/store';

interface IProductContent {
  product: IProduct;
  handleSizeChartPopup: () => void;
  closeButton: boolean;
  onClose?: () => void;
}

export default function ProductContent({ 
  product, 
  handleSizeChartPopup, 
  closeButton, 
  onClose }: IProductContent) {
  const [isManeImage, setIsManeImage] = useState<string>(
    product.images[0].image_url
  );
  const { handleProductPopupToggle } = useProductPopup();
  const dispatch = useDispatch();

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(toggleFavorite(product));
  }

  const id  = product.id;

  const isProductFavorite = useSelector((state: RootState) => isFavorite(state, id));

  const handleImageMain = (image: string) => {
    setIsManeImage(image);
  }

  console.log(isProductFavorite)

  return (
    <>
      <div className={styles.product__content}>
        <div className={`
          ${styles['product__content-images']} 
          ${styles.images}
          `}>
          <div className={styles.images__all}>
            {Array.isArray(product.images) ? (
              product.images.map((image: { image_url: string }) => (
                <Image
                  key={image.image_url}
                  alt={product.title}
                  src={image.image_url}
                  className={isManeImage === image.image_url
                    ? styles['images__all_active']
                    : ''
                  }
                  width={0}
                  height={0}
                  layout="responsive"
                  priority
                  onClick={() => handleImageMain(image.image_url)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className={styles.images__main}>
            <ZoomImagePopup
              src={isManeImage}
              alt={product.title}
            />
          </div>
        </div>
        <div className={`
          ${styles['product__content-description']} 
          ${styles.description}
          `}>
          <div className={styles['title-block']}>
            <Title className={styles['title-main']}>
              {product.title}
            </Title>
            {closeButton ? <CloseButton onClick={onClose} /> : null}
          </div>
          <div className={styles.description__color}>
            <div>Color: <span>{product.color}</span></div>
            <Color color={product.color} />
          </div>
          <div className={styles.sizes}>
            {product.sizes.map((size) => (
              <Button key={size.id} disabled={!size.available}>
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
            onClick={handleSizeChartPopup}
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
            <Button>Add To Cart</Button>
            <FavoriteButton 
              onClick={handleToggleFavorite}
              isFavorite={isProductFavorite}
              border
            />
          </div>
        </div>
      </div>
    </>
  )
};