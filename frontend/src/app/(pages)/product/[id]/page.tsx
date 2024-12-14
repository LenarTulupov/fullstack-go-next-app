import dynamic from "next/dynamic";

const Product = dynamic(() => import("@/client-pages/pages/product/page"), { 
  ssr: false 
});

export default function ProductPage() {
  return <Product />;
}
