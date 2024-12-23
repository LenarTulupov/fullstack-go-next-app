'use client'

import { IProduct } from '@/types/product.interface';
import { Carousel } from 'antd';
import Card from '@/components/card/card';
import Arrow from '@/components/ui/arrow/arrow';
import { useRef, useState, useEffect } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import styles from './products-carousel.module.scss';
import CardSkeleton from '@/components/ui/card-skeleton/card-skeleton';

interface IProductsCarousel {
  displayedProducts: IProduct[];
  isLoading?: boolean;
}

export default function ProductsCarousel({ displayedProducts, isLoading }: IProductsCarousel) {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(4);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth > 992) {
        setItemsPerSlide(4)
      } else if (window.innerWidth > 768) {
        setItemsPerSlide(3)
      } else if (window.innerWidth > 320) {
        setItemsPerSlide(2)
      } else {
        setItemsPerSlide(1)
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);

    return () => {
      window.removeEventListener('resize', updateItemsPerSlide);
    };
  }, []);

  const groupedProducts = [];
  for (let i = 0; i < displayedProducts.length; i += itemsPerSlide) {
    groupedProducts.push(displayedProducts.slice(i, i + itemsPerSlide));
  }

  const totalSlides = groupedProducts.length;

  const handleBeforeChange = (from: number, to: number) => {
    setTimeout(() => setCurrentSlide(to), 300);
  };

  const showPrevButton = currentSlide > 0;
  const showNextButton = currentSlide < totalSlides - 1;

  return (
    <div className={styles['products-carousel']}>
<Carousel
      ref={carouselRef}
      className={styles['products-carousel__carousel']}
      arrows={false}
      dots={false}
      beforeChange={handleBeforeChange}
    >
      {isLoading ? (
        <div className={styles['products-carousel__grid']}>
          {Array.from({ length: itemsPerSlide }).map((_, index) => (
            <CardSkeleton key={index} info={false} />
          ))}
        </div>
      ) : (
        groupedProducts.map((group, index) => (
          <div key={index} className={styles['products-carousel__grid']}>
            {group.map((product) => (
              <Card key={product.id} product={product} info={false} />
            ))}
          </div>
        ))
      )}
    </Carousel>
      {showPrevButton && (
        <button
          className={styles['products-carousel__prev-arrow']}
          onClick={() => carouselRef.current?.prev()}
        >
          <Arrow position="left" size="large" carousel />
        </button>
      )}
      {showNextButton && (
        <button
          className={styles['products-carousel__next-arrow']}
          onClick={() => carouselRef.current?.next()}
        >
          <Arrow position="right" size="large" carousel />
        </button>
      )}
    </div>
  );
}
