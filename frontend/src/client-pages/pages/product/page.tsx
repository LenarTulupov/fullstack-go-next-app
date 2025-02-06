"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { productsData, setProducts } from "@/store/products/productsSlice";
import Container from "@/components/ui/container/container";
import ProductContent from "@/components/product-content/product-content";
import Loader from "@/components/ui/loader/loader";
import useSizeChartPopup from "@/utils/hooks/useSizeChartPopup";
import { URL } from "@/constants/url";
import styles from "./page.module.scss";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(productsData);
  const [loading, setLoading] = useState(true);
  const { toggleSizeChartPopup } = useSizeChartPopup();

  const product = products.find((product) => product.id === Number(id));

  useEffect(() => {
    async function fetchProduct() {
      if (!product) {
        try {
          const res = await fetch(`${URL}${API_ENDPOINTS.PRODUCTS}/${id}`);
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
    return <Loader />;
  }

  if (!product) {
    return (
      <Container>
        <div className={styles.message}>Product not found</div>
      </Container>
    );
  }

  return (
    <div className={styles.product}>
      <Container>
        <ProductContent
          product={product}
          onClose={toggleSizeChartPopup}
          closeButton={false}
        />
      </Container>
    </div>
  );
}
