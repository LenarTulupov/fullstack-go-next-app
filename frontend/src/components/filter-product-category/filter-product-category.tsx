import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "@/types/product.interface";
import useProductPopup from "@/hooks/useProductPopup";
import useProducts from "@/utils/useProducts";
import ProductsGrid from "../ui/products-grid/products-grid";
import CardSkeleton from "../ui/card-skeleton/card-skeleton";
import Popup from "../ui/modal/modal";
import ProductContent from "../product-content/product-content";
import SizeChartContent from "../size-chart-content/size-chart-content";
import PopupItemsContent from "../popup-items/poput-items-content";
import Card from "../card/card";
import { addToCart } from "@/store/cart/cart-slice";
import { ISize } from "@/types/sizes.interface";
import { RootState } from "@/store/store";

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
  const selectedSizes = useSelector((state: RootState) => state.sizeFilter.selectedSizes);
  const selectedColors = useSelector((state: RootState) => state.colorFilter.selectedColors);
  const selectedPrice = useSelector((state: RootState) => state.priceFilter.selectedPrice);
  const selectedSortOption = useSelector(
    (state: RootState) => state.selectedSortOption.selectedSortOption
  );

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  }

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  }

  const handleAddedToCart = (size: ISize) => {
    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, size }));
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

  const parsePriceRange = (priceRange: string) => {
    const [min, max] = priceRange.split(' - ').map(Number);
    return { min, max };
  };

  let filteredProducts = products
    .filter(filterFunction)
    .filter(product =>
      (selectedSizes.length === 0 || product.sizes.some(size =>
        size.name && selectedSizes.includes(size.name.toLowerCase()) && size.available)) &&
      (selectedColors.length === 0 || selectedColors.includes(product.color.toLowerCase())) &&
      (!selectedPrice || (
        parseFloat(product.price_new) >= parsePriceRange(selectedPrice).min &&
        parseFloat(product.price_new) <= parsePriceRange(selectedPrice).max
      ))
    );

  if (selectedSortOption === 'low to high') {
    filteredProducts = filteredProducts.sort((a, b) =>
      parseFloat(a.price_new) - parseFloat(b.price_new));
  } else if (selectedSortOption === 'high to low') {
    filteredProducts = filteredProducts.sort((a, b) =>
      parseFloat(b.price_new) - parseFloat(a.price_new));
  }


  if (sortFunction) {
    filteredProducts = [...filteredProducts].sort(sortFunction);
  }

  return (
    <div>
      <ProductsGrid>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => <CardSkeleton key={index} />)
          : filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
      </ProductsGrid>
    </div>
  );
}