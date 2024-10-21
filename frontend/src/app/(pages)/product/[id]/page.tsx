'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { productsArray, productsData, setProducts } from '@/store/products/productsSlice';
import styles from './page.module.scss';
import Container from '@/components/ui/container/container';
import Title from '@/components/ui/title/title';
import ProductContent from '@/components/product-content/product-content';

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(productsData);
  const [loading, setLoading] = useState(true);
  const [isPopupPageOpened, setIsPopupPageOpened] = useState<boolean>(false);

  const handlePopupPageOpened = () => {
    setIsPopupPageOpened(p => !p);
  }

  const product = products.find((product) => product.id === Number(id));

  useEffect(() => {
    async function fetchProduct() {
      if (!product) {
        try {
          const res = await fetch(
            `https://backend-bbpq.onrender.com/products/${id}`
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

  return (
    <div className={styles.product}>
      <Container>
        <ProductContent
          product={product}
          isPopupPageOpened={isPopupPageOpened}
          popup={true}
        />
        <div>
          <Title>
            recommended
          </Title>

        </div>
      </Container>
    </div>
  );
};
