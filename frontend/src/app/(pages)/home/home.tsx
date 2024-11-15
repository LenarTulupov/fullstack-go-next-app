'use client'

import { Carousel } from 'antd'
import { bannerImagesLarge } from '@/constants/banners-images'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.scss'

export default function Home() {
  const handleImageLoad = (url: string) => {
    console.log(`Image loaded: ${url}`)
  }
  return (
    <div className={styles.home}>
      <div className={styles['carousel-wrapper']}>
        <Carousel
          dots={false}
          infinite={true}
          speed={2000}
          autoplay
          autoplaySpeed={10000}
          effect="fade"
        >
          {bannerImagesLarge.map((banner, index) => (
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
                  priority={index === 0}
                  onLoadingComplete={() => handleImageLoad(banner)}
                />
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
