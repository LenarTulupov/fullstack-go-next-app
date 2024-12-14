'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { categories } from "@/constants/categories";
import Image from "next/image";
import Container from "@/components/ui/container/container";
import Link from "next/link";
import Arrow from "@/components/ui/arrow/arrow";
import styles from './categories.module.scss';

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  const carouselRef = useRef<CarouselRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(4);


  const groupedItems = [];

  for (let i = 0; i < categories.length; i += itemsPerSlide) {
    groupedItems.push(categories.slice(i, i + itemsPerSlide))
  }

  const totalSlide = groupedItems.length;

  const handleBeforeChange = (from: number, to: number) => {
    setTimeout(() => setCurrentSlide(to), 300)
  }

  const showPrevButton = currentSlide > 0;
  const showNextButton = currentSlide < totalSlide - 1;

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if(window.innerWidth > 992) {
        setItemsPerSlide(4)
      } else if(window.innerWidth > 768) {
        setItemsPerSlide(3)
      } else if(window.innerWidth > 320) {
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

  return (
    <section className={styles.categories}>
      <Container>
        <Carousel
          arrows={false}
          dots={false}
          ref={carouselRef}
          beforeChange={handleBeforeChange}
        >
          {groupedItems.map((groupItem, groupIndex) => (
            <div className={styles.categories__grid} key={groupIndex}>
              {groupItem.map((item, index) => (
                <>
                  <motion.div
                    ref={index === 0 ? ref : undefined}
                    initial={{ y: 200, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    <Link
                      href={`/category/${item.name}`}
                      className={styles['categories__link']}
                    >
                      <Image
                        className={styles.categories__image}
                        key={index}
                        src={item.url}
                        alt={`category ${item.name}`}
                        width={0}
                        height={0}
                        layout="responsive"
                      />
                      <Link
                        href={`/category/${item.name}`}
                        className={styles['categories__link-sublink']}
                      >
                        {item.name}
                      </Link>
                    </Link>
                  </motion.div >
                </>
              ))}
            </div>
          ))}
        </Carousel>
        {showPrevButton && (
          <button
            className={styles['carousel__prev-arrow']}
            onClick={() => carouselRef.current?.prev()}
          >
            <Arrow position="left" size="large" carousel />
          </button>
        )}
        {showNextButton && (
          <button
            className={styles['carousel__next-arrow']}
            onClick={() => carouselRef.current?.next()}
          >
            <Arrow position="right" size="large" carousel />
          </button>
        )}
      </Container>
    </section >
  )
};
