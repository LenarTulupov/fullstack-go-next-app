'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './home.module.scss';
import FeaturedCollection from './featured-collection/featured-collection';
import Banner from './banner';
import BlackFriday from './black-friday/black-friday';
import Categories from './categories/categories';

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div className={styles.home}>
      <Banner />
      <motion.div
        ref={ref}
        initial={{ y: 200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: .5,
          ease: 'easeInOut',
        }}
      >
        <FeaturedCollection />
      </motion.div>
      <BlackFriday/>
      <Categories/>
    </div>
  );
}
