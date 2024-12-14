import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/client-pages/pages/cart/page"), { 
  ssr: false 
});

export default function CartPage() {
  return <Cart />;
}

