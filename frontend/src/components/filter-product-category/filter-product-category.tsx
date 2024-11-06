import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
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
import { addToCart } from "@/store/cart/cartSlice";
import { ISize } from "@/types/sizes.interface";
import Sidebar from "../ui/sidebar/sidebar";
import useCart from "@/hooks/useCart";
import CartContent from "../cart-content/cart-content";



interface IFilterProductCategory {
  filterFunction: (product: IProduct) => boolean;
  sortFunction?: (a: IProduct, b: IProduct) => number;
}

export default function FilterProductCategory(
  { filterFunction, sortFunction }: IFilterProductCategory) {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
  const { isProductPopupOpened, handleProductPopupToggle } = useProductPopup();

  const { isCartSidebarOpened } = useCart();

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  }

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  }

  // const handleAddedToCart = () => { 
  //   setIsAddedToCart(p => !p);
  // }
  const handleAddedToCart = (size: ISize) => {
    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, size }))
    }
    setIsAddedToCart(false);
  }

  const handleClosePopup = () => {
    setSelectedProduct(null);
    handleProductPopupToggle();
  };

  const handleSizeSelectPopup = (product: IProduct) => {
    setSelectedProduct(product);
    setIsAddedToCart(true);
  };

  if (error) return <div>Error fetching products</div>;

  let filteredProducts = products.filter(filterFunction);

  if (sortFunction) {
    filteredProducts = [...filteredProducts].sort(sortFunction);
  }


  return (
    <div>
      <ProductsGrid>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
          : filteredProducts.map((product) => {
            return (
              <Card
                key={product.id}
                product={product}
                // handleFavorite={() => handleAddToFavorite(product)}
                onClick={() => handleSelectedProduct(product)}
                // handleAddedToCart={handleAddedToCart}
                handleSizeSelectPopup={() => handleSizeSelectPopup(product)}
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
            onClose={handleClosePopup}
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
            handleAddToCartClick={(size: ISize) => handleAddedToCart(size)}
            onClose={() => setIsAddedToCart(false)}
          />
        </Popup>
      )}
      <Sidebar isCartSidebarOpened={isCartSidebarOpened}>
        <CartContent />
      </Sidebar>
    </div>
  )
};
