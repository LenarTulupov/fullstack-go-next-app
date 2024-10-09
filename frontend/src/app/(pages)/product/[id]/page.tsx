'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { productsArray, setProducts } from '@/store/products/productsSlice';
import styles from './page.module.scss';
import Container from '@/components/ui/container/container';
import Image from 'next/image';
import Title from '@/components/ui/title/title';
import FavoriteButton from '@/components/ui/favorite-button/favorite-button';
import Price from '@/components/ui/price/price';
import Color from '@/components/ui/color/color';
import Button from '@/components/ui/button/button';
import { IoCloseOutline } from 'react-icons/io5';
import Accordion from '@/components/ui/accordion/accordion';
import AccordionList from '@/components/ui/accordion/accordion-list';
import AccordionListItem from '@/components/ui/accordion/accordion-list-item';

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(productsArray);
  const [loading, setLoading] = useState(true);
  const [isAccordionOpened, setIsAccordionOpened] = useState<boolean>(false);

  const handleAccordion = () => {
    setIsAccordionOpened(p => !p);
  }

  const product = products.find((product) => product.id === Number(id));

  useEffect(() => {
    async function fetchProduct() {
      if (!product) {
        try {
          const res = await fetch(
            `https://fullstack-go-next-app.onrender.com/products/${id}`
          );
          if (res.ok) {
            const data = await res.json();
            dispatch(setProducts([data]));
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [product, id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(product)

  return (
    <div className={styles.product}>
      <Container>
        <div className={styles.product__content}>
          <div className={`
            ${styles['product__content-images']} 
            ${styles.images}
          `}>
            <div className={styles.images__all}>
              {Array.isArray(product.images) ? (
                product.images.map((image: { image_url: string }) => (
                  <Image
                    key={image.image_url}
                    alt={product.title}
                    src={image.image_url}
                    width={0}
                    height={0}
                    layout="responsive"
                    priority
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className={styles.images__main}>
              <Image
                alt={product.title}
                src={product.thumbnail}
                width={200}
                height={0}
                layout="responsive"
                priority
              />
            </div>
          </div>
          <div className={`
            ${styles['product__content-description']} 
            ${styles.description}
          `}>
            <Title>
              {product.title}
            </Title>
            <div className={styles.description__color}>
              Color: <span>{product.color}</span>
              <Color color={product.color} />
            </div>
            {product.sizes.map((size) => (

              <Button key={size.id} disabled={!size.available}>
                {/* <Sizes sizes={product.sizes} /> */}
                {size.abbreviation}
              </Button>
            ))}
            {/* <FavoriteButton /> */}
            <div className={styles.description__prices}>
              <Price price={product.price_new} />
              <Price price={product.price_old} />
            </div>
            <button className={styles['description__size-button']}>
              <Image
                src={'/size.svg'}
                alt="size"
                width={100}
                height={0}
                layout='responsive'
              />
              <span>Size Chart</span>
            </button>
            <Button>Add To Cart</Button>
            <Accordion
              title={<Title>Description</Title>}
              image={<IoCloseOutline />}
              onClick={handleAccordion}
            >
              {isAccordionOpened &&
                <AccordionList isAccordionOpened={isAccordionOpened}>
                  <AccordionListItem>
                    {product.description}
                  </AccordionListItem>
                </AccordionList>
              }
            </Accordion>
          </div>
        </div>
        <div>
          <Title>
            recommended
          </Title>

        </div>
      </Container>
    </div>
  );
};
