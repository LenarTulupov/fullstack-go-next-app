'use client'

import { Carousel } from 'antd'
import { bannerImagesLarge } from '@/constants/banners-images'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.scss'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader/loader'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const imageLoaders = bannerImagesLarge.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new window.Image()
            img.src = src
            img.onload = resolve
            img.onerror = reject
          })
      )
      await Promise.all(imageLoaders)
      setLoading(false) 
    }

    loadImages()
  }, [])
  return (
    <div className={styles.home}>
      <div className={styles['carousel-wrapper']}>
      {loading ? (
          <Loader/>
        ) : (
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
                    width={0}
                    height={0}
                    layout="responsive"
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
