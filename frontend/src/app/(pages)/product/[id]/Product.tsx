'use client'

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { productsArray } from '@/store/products/productsSlice';

export default function Product() {
  const { id } = useParams();
  const products = useSelector(productsArray);
  const product = products.find((product) => product.id === Number(id));

  if(!product) {
    return <div>Product not found</div>;
  };

  const imageUrl = product.product_colors[0].product_color_images[0].image_path;

  return (
    <div>
        <Image
          src={imageUrl}
          alt={product.title}
          width={100}
          height={200}
        />
        <div>{product.title}</div>
    </div>
  )
};

