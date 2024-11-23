'use client'

import { motion } from 'framer-motion';
import styles from './home.module.scss'
import FeaturedCollection from './featured-collection/featured-collection'
import Banner from './banner'

export default function Home() {
  return (
    <div className={styles.home}>
      <Banner />
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }}
      >
        <FeaturedCollection />
      </motion.div>
    </div>
  )
}
