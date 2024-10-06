'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { productsArray, setProducts } from '@/store/products/productsSlice';
import styles from './page.module.scss';
import Container from '@/components/ui/container/container';
import Image from 'next/image';
import Title from '@/components/ui/title/title';
import Sizes from '@/components/sizes/sizes';



export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(productsArray);
  const [loading, setLoading] = useState(true);

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
              {product.images.map((image) => {
                return (
                  <Image
                    key={product.id}
                    alt={product.title}
                    src={image.image_url}
                    width={0}
                    height={0}
                    layout="responsive"
                    priority
                  />
                )
              })}
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
            </div>
            {/* <Sizes sizes={product.sizes}/> */}
          </div>
        </div>
      </Container>
    </div>
  );
};
