import Image from 'next/image';
import Title from '../ui/title/title';
import Color from '../ui/color/color';
import Button from '../ui/button/button';
import Price from '../ui/price/price';
import { createPortal } from 'react-dom';
import CloseButton from '../ui/close-button/close-button';
import { IProduct } from '@/types/product.interface';
import Accordion from '../ui/accordion/accordion';
import { IoCloseOutline } from 'react-icons/io5';
import AccordionList from '../ui/accordion/accordion-list';
import AccordionListItem from '../ui/accordion/accordion-list-item';
import { useState } from 'react';
import styles from './popup-page.module.scss';

interface IPopupPage {
  product: IProduct
  handlePopupPageOpened: () => void;
  isPopupPageOpened: boolean;
}

export default function PopupPage({ 
  product, handlePopupPageOpened, isPopupPageOpened }: IPopupPage) {
  const [isAccordionOpened, setIsAccordionOpened] = useState<boolean>(false);

  const handleAccordion = () => {
    setIsAccordionOpened(p => !p);
  }

  console.log(product)
  return createPortal(
    <div className={`
      ${styles['popup-page__background']} 
      ${isPopupPageOpened ? styles['popup-page__background_opened'] : ''}
    `}>
      <div className={`
        ${styles['popup-page']} 
        ${isPopupPageOpened ? styles['popup-page_opened'] : ''}
      `}>
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
                    width={0}
                    height={0}
                    layout="responsive"
                    priority
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className={styles.images__main}>
              <Image
                alt={product.title}
                src={product.images[0].image_url}
                width={200}
                height={0}
                layout="responsive"
                priority
              />
            </div>
          </div>
          <div className={`
            ${styles['product__content-description']} 
            ${styles.description}
            `}>
            <Title>
              {product.title}
            </Title>
            <div className={styles.description__color}>
              Color: <span>{product.color}</span>
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
              <Price price={product.price_new} />
              <Price price={product.price_old} />
            </div>
            <button className={styles['description__size-button']}>
              <Image
                src={'/size.svg'}
                alt="size"
                width={100}
                height={0}
                layout='responsive'
              />
              <span>Size Chart</span>
            </button>
            <Button>Add To Cart</Button>
            <Accordion
              title={<Title>Description</Title>}
              image={<IoCloseOutline />}
              onClick={handleAccordion}
            >
              <AccordionList isAccordionOpened={isAccordionOpened}>
                <AccordionListItem>
                  {product.description}
                </AccordionListItem>
              </AccordionList>
            </Accordion>
          </div>
          <div className={styles['close-button']}>
            <CloseButton onClick={handlePopupPageOpened} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
};
