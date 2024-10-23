import { IProduct } from "@/types/product.interface"
import { useState } from "react";
// import Card from "../card/card";
import styles from './pagination.module.scss'
// import { useDispatch, useSelector } from "react-redux";
// import { addFavorite, removeFavorite, selectFavoriteProducts } from "@/store/favorite-button/favoriteButtonSlice";

interface IPagination {
  products: IProduct[];
}

export default function Pagination({ products }: IPagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const dispatch = useDispatch();
  // const favoriteProducts = useSelector(selectFavoriteProducts);

  // const handleAddToFavorite = (product: IProduct) => {
  //   const isFavorite = favoriteProducts.some(favProduct => favProduct.id === product.id);

  //   if (isFavorite) {
  //     dispatch(removeFavorite(product.id));
  //   } else {
  //     dispatch(addFavorite(product));
  //   }
  // };

  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;

  // const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className={styles.pagination__products}>

        {/* {currentProducts.map((product) => {
          const isFavorite = favoriteProducts.some(
            favProduct => favProduct.id === product.id);
          console.log(isFavorite)
          return (
            <Card
              key={product.id}
              product={product}
              handleFavorite={() => handleAddToFavorite(product)}
              description={product.description}
            />
          )
        })} */}
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
