'use client'

import styles from './home.module.scss'
import FeaturedCollection from './featured-collection/featured-collection'
import Banner from './banner'

export default function Home() {
  return (
    <div className={styles.home}>
      <Banner/>
      <FeaturedCollection/>
    </div>
  )
}
