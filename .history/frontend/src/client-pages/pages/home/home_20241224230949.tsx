'use client';

import Banner from './banner';
import FeaturedCollection from './featured-collection/featured-collection';
import BlackFriday from './black-friday/black-friday';
import Categories from './categories/categories';
import styles from './home.module.scss';

export default function Home() {
  return (
    <main className={styles.home}>
      <Banner />
      <FeaturedCollection />
      <BlackFriday />
      <Categories />
    </main>
  );
}
