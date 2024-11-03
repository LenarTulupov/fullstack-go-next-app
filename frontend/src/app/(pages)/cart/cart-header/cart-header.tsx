'use client'

import CartService from "@/services/cart.service";

export default function CartHeader() {
  const { productsQuantity } = CartService();

  return (
    <div>
        Cart({productsQuantity})
    </div>
  )
};
