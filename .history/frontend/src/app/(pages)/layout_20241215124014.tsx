import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from './layout.module.scss';
import { ReactNode } from "react";

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  return (
    <>
      <Header />
      <div className={styles.layout__children} >
        {children}
      </div>
      <Footer />
    </>
  )
};

// import Footer from "@/components/footer/footer";
// import Header from "@/components/header/header";
// import Loader from "@/components/ui/loader/loader";
// import { ReactNode, useEffect, useRef, useState } from "react"
// import styles from './layout.module.scss';
// import Sidebar from "@/components/ui/sidebar/sidebar";
// import CartContent from "@/components/cart-content/cart-content";
// import useCart from "@/hooks/useCart";
// import { usePathname } from "next/navigation";
// import Popup from "@/components/ui/popup/popup";
// import useProductPopup from "@/hooks/useProductPopup";
// import ProductContent from "@/components/product-content/product-content";
// import { IProduct } from "@/types/product.interface";
// import PopupItemsContent from "@/components/popup-items/poput-items-content";
// import { useInView } from "framer-motion";

// interface IPagesLayout {
//   children: ReactNode;
// }

// export default function PagesLayout({ children }: IPagesLayout) {
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const { isProductPopupOpened } = useProductPopup();
//   const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
//   const handleSizeChartPopup = () => {
//     setIsSizeChartPopupOpened(p => !p);
//   };

//   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

//   const handleSelectedProduct = (product: IProduct) => {
//     setSelectedProduct(product);
//   };

//   const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
//   const handleAddedToCart = () => {
//     setIsAddedToCart(p => !p);
//   };

//   const isCategoriesPage =
//     pathname.startsWith('/categories') ||
//     pathname === '/favorite' ||
//     /^\/product\/[^/]+$/.test(pathname) ||
//     pathname === '/search';

//   useEffect(() => {
//     setIsLoading(false);
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           {selectedProduct && (
//             <Popup isPopupOpened={isProductPopupOpened} nested>
//               <ProductContent
//                 product={selectedProduct}
//                 handleSizeChartPopup={handleSizeChartPopup}
//                 closeButton
//               />
//             </Popup>
//           )}
//           {isAddedToCart && selectedProduct && (
//             <Popup isPopupOpened={isAddedToCart} nested>
//               <PopupItemsContent
//                 items={selectedProduct.sizes}
//                 handleAddToCartClick={handleAddedToCart}
//               />
//             </Popup>
//           )}
//           <Header />
//           <div className={isCategoriesPage
//             ? styles.layout__children
//             : styles['layout__children_no-margin']}
//           >
//             {children}
//           </div>
//           <Footer />
//         </>
//       )}
//     </div>
//   )
// };

