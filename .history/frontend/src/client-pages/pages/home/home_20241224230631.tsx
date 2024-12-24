'use client';

import FeaturedCollection from './featured-collection/featured-collection';
import Banner from './banner';
import BlackFriday from './black-friday/black-friday';
import Categories from './categories/categories';
import styles from './home.module.scss';

export default function Home() {


  return (
    <div className={styles.home}>
      <Banner />
      <FeaturedCollection />
      <BlackFriday />
      <Categories />
    </div>
  );
}
