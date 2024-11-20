import { IProduct } from '@/types/product.interface';
import { Carousel } from 'antd';
import Card from '@/components/card/card';
import Arrow from '@/components/ui/arrow/arrow';
import { useRef, useState } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import styles from './products-carousel.module.scss';

interface IProductsCarousel {
  displayedProducts: IProduct[]
}

export default function ProductsCarousel({ displayedProducts }: IProductsCarousel) {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const groupedProducts = [];
  for (let i = 0; i < displayedProducts.length; i += 4) {
    groupedProducts.push(displayedProducts.slice(i, i + 4));
  }

  const totalSlides = groupedProducts.length;

  const handleBeforeChange = (from: number, to: number) => {
    setTimeout(() => setCurrentSlide(to), 300);
  }

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
        {groupedProducts.map((group, index) => (
          <div key={index} className={styles['products-carousel__grid']}>
            {group.map((product) => (
              <Card key={product.id} product={product} info={false} />
            ))}
          </div>
        ))}
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
  )
};
