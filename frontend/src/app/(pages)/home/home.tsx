'use client'

import { Carousel } from 'antd'
import { bannerImagesLarge } from '@/constants/banners-images'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.scss'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader/loader'
import { createPortal } from 'react-dom'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles['carousel-wrapper']}>
        {isLoading ? (
          <Loader/>
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
                    priority
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  )
}
