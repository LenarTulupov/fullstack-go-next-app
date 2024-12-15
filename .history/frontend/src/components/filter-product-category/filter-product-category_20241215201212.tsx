import useProducts from "@/utils/useProducts";
import Card from "../card/card";
import CardSkeleton from "../ui/card-skeleton/card-skeleton";
import ProductsGrid from "../ui/products-grid/products-grid";

export default function FilterProductCategory({ filterFunction, sortFunction }: IFilterProductCategory) {
  const { products, error, isLoading } = useProducts();

  if (error) return <div>Error fetching products</div>;

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
            <Card
              key={product.id}
              product={product}
              onClick={() => {}}
              handleSizeSelectPopup={() => {}}
            />
          ))}
      </ProductsGrid>
    </div>
  );
}
