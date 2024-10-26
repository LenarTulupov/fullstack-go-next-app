'use client'

import { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { bannerImagesLarge } from '@/constants/banners-images'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.scss'
import Loader from '@/components/ui/loader/loader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = bannerImagesLarge.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new globalThis.Image();
        img.src = src;
        img.onload = resolve; 
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки изображения:", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles['carousel-wrapper']}>
        {isLoading ? (
          <Loader />
        ) : (
          <Carousel
            dots={false}
            infinite={true}
            speed={2000}
            autoplay
            autoplaySpeed={10000}
            effect='fade'
          >
            {bannerImagesLarge.map((banner, index) => (
              <Link
                key={index}
                href='/category/trends'
                className={styles['image-link']}
              >
                <div className={styles['image-wrapper']}>
                  <Image
                    src={banner}
                    alt="banner"
                    fill
                    objectFit='cover'
                    priority={index === 0} 
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
