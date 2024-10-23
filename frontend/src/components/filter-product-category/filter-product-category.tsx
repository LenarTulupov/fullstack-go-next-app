import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, removeFavorite, selectFavoriteProducts } from "@/store/favorite-button/favoriteButtonSlice";
import { IProduct } from "@/types/product.interface";
import useProductPopup from "@/hooks/useProductPopup";
import useProducts from "@/utils/useProducts";
import ProductsGrid from "../ui/products-grid/products-grid";
import CardSkeleton from "../ui/card-skeleton/card-skeleton";
import Popup from "../ui/popup/popup";
import ProductContent from "../product-content/product-content";
import SizeChartContent from "../size-chart-content/size-chart-content";
import PopupItemsContent from "../popup-items/poput-items-content";
import Card from "../card/card";


interface IFilterProductCategory {
  filterFunction: (product: IProduct) => boolean;
  sortFunction?: (a: IProduct, b: IProduct) => number;
}

export default function FilterProductCategory({ filterFunction, sortFunction }: IFilterProductCategory) {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const favoriteProducts = useSelector(selectFavoriteProducts);
  const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
  const { isProductPopupOpened } = useProductPopup();

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  }

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  }

  const handleAddedToCart = () => { 
    setIsAddedToCart(p => !p);
  }

  if (error) return <div>Error fetching products</div>;

  const handleAddToFavorite = (product: IProduct) => {
    const isFavorite = favoriteProducts.some(favProduct => favProduct.id === product.id);

    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  let filteredProducts = products.filter(filterFunction);

  if(sortFunction) {
    filteredProducts = [...filteredProducts].sort(sortFunction);
  }

  console.log(filteredProducts)

  return (
    <div>
      <ProductsGrid>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : filteredProducts.map((product) => {
              const isFavorite = favoriteProducts.some(favProduct => favProduct.id === product.id);
              return (
                <Card
                  key={product.id}
                  product={product}
                  handleFavorite={() => handleAddToFavorite(product)}
                  onClick={() => handleSelectedProduct(product)}
                  handleAddedToCart={handleAddedToCart}
                />
              );
            })}
      </ProductsGrid>
      {selectedProduct && (
        <Popup isPopupOpened={isProductPopupOpened} nested>
          <ProductContent
            product={selectedProduct}
            handleSizeChartPopup={handleSizeChartPopup}
            closeButton
          />
        </Popup>
      )}
      {selectedProduct && (
        <Popup nested isPopupOpened={isSizeChartPopupOpened}>
          <SizeChartContent handleSizeChart={handleSizeChartPopup} />
        </Popup>
      )}
      {isAddedToCart && selectedProduct && (
        <Popup isPopupOpened={isAddedToCart} nested>
          <PopupItemsContent
            items={selectedProduct.sizes}
            handleAddToCartClick={handleAddedToCart}
          />
        </Popup>
      )}
    </div>
  )
};
