import Title from '@/components/ui/title/title';
import Container from '@/components/ui/container/container';
import { useState } from 'react';
import useProducts from '@/utils/useProducts';
import Button from '@/components/ui/button/button';
import ProductsCarousel from './products-carousel';
import styles from './featured-collection.module.scss';
import Card from '@/components/card/card';
import Tab from '@/components/ui/tabs/tab';

export default function FeaturedCollection() {
  const tabs = ['hot', 'new'];
  const tabsFirstUpperLetter = tabs.map((item) => item.slice(0, 1).toUpperCase() + item.slice(1));
  const [selectedTab, setSelectedTab] = useState<string>(tabsFirstUpperLetter[0]);
  const [isCarousel, setIsCarousel] = useState<boolean>(true);
  const { products, isLoading } = useProducts();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '20%' });

  const filteredProducts = products.filter((product) => {
    if (selectedTab === 'Hot') {
      return product.categories?.includes('trends')
    } else if (selectedTab === 'New') {
      return product
    }
    return true;
  });

  const displayedProducts = filteredProducts.slice(0, 8);

  const handleSelectedTab = (item: string) => {
    setSelectedTab(item);
    setIsCarousel(true);
  };

  const carouselToggle = () => {
    setIsCarousel(p => !p);
  }

  return (
    <section className={styles['featured-collection']}>
      <Container>
      <motion.div
        ref={ref}
        initial={{ y: 200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: .5,
          ease: 'easeInOut',
        }}
        >
        <div className={styles['featured-collection__text']}>
          <Title
            className={styles['featured-collection__title']}
            weight='bold'
          >
            Featured Collection
          </Title>
          <div className={styles['featured-collection__tabs']}>
            {tabsFirstUpperLetter.map((item, index) => (
              <Tab
                key={index}
                className={`
                  ${styles['featured-collection__tab']} 
                  ${selectedTab === item ? styles['featured-collection__tab_active'] : ''}
                `}
                onClick={() => handleSelectedTab(item)}
              >
                {item}
              </Tab>
            ))}
          </div>
        </div>
        {isCarousel ?
          <ProductsCarousel displayedProducts={displayedProducts} isLoading={isLoading} />
          : <div className={styles['featured-collection__grid']}>
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} info={false} />
            ))}
          </div>}
        {displayedProducts.length > 4 && (
          <Button
            className={styles['featured-collection__button']}
            onClick={carouselToggle}
          >
            {isCarousel ? 'View All' : 'Close'}
          </Button>
        )}
              </motion.div>
      </Container>
    </section>
  )
};
