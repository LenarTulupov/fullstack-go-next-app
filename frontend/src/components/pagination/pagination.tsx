import { IProduct } from "@/types/product.interface"
import { useState } from "react";
import Card from "../card/card";
import styles from './pagination.module.scss'

interface IPagination {
  products: IProduct[];
}

export default function Pagination({ products }: IPagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className={styles.pagination__products}>

        {currentProducts.map((product) => {
          const imageUrl =
            product.product_colors[0].product_color_images[0].image_path;
          return (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price_new={product.price_new}
              price_old={product.price_old}
              sizes={product.sizes}
              src={imageUrl}
              alt={product.title}
              color={product.color}
            />
          )
        })}
      </div>

      <div className={styles.pagination__buttons}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={styles.pagination__button}
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            disabled={i + 1 === currentPage}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
};
