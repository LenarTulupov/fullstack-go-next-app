import Title from '@/components/ui/title/title';
import Container from '@/components/ui/container/container';
import { useState } from 'react';
import useProducts from '@/utils/useProducts';
import Button from '@/components/ui/button/button';
import ProductsCarousel from './products-carousel';
import styles from './featured-collection.module.scss';
import Card from '@/components/card/card';

export default function FeaturedCollection() {
  const tabs = ['hot', 'new'];
  const [selectedTab, setSelectedTab] = useState<string>('hot');
  const [isCarousel, setIsCarousel] = useState<boolean>(true);
  const { products } = useProducts();

  const filteredProducts = products.filter((product) => {
    if (selectedTab === 'hot') {
      return product.categories?.includes('trends')
    } else if (selectedTab === 'new') {
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
        <div className={styles['featured-collection__text']}>
          <Title className={styles['featured-collection__title']}>Featured Collection</Title>
          <div className={styles['featured-collection__tabs']}>
            {tabs.map((item, index) => (
              <Button
                className={`
                  ${styles['featured-collection__tab']} 
                  ${selectedTab === item ? styles['featured-collection__tab_active']: ''}
                `}
                key={index}
                onClick={() => handleSelectedTab(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        {isCarousel ?
          <ProductsCarousel displayedProducts={displayedProducts} />
          : <div className={styles['featured-collection__grid']}>
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} info={false} />
            ))}
          </div>}
        <Button
          className={styles['featured-collection__button']}
          onClick={carouselToggle}
        >
          {isCarousel ? 'View All' : 'Close'}
        </Button>
      </Container>
    </section>
  )
};
