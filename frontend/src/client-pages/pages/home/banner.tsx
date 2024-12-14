'use client'

import { Carousel } from 'antd'
import { bannerImagesLarge, bannerImagesMobile } from '@/constants/banners-images'
import Image from 'next/image'
import Link from 'next/link'
import styles from './banner.module.scss';
import { useEffect, useState } from 'react';

export default function Banner() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bannerImages = isMobile ? bannerImagesMobile : bannerImagesLarge;
  return (
    <section className={styles['banner-wrapper']}>
      <Carousel
        dots={false}
        infinite={true}
        speed={2000}
        autoplay
        autoplaySpeed={10000}
        effect="fade"
      >
        {bannerImages.map((banner, index) => (
          <Link
            key={index}
            href="/category/trends"
            className={styles['image-link']}
          >
            <div className={styles['image-wrapper']}>
              <Image
                src={banner}
                alt="banner"
                width={1800}
                height={900}
                layout='responsive'
                priority={index === 0}
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  )
};
