import { selectCart } from "@/store/cart/cartSlice"
import { useSelector } from "react-redux"

export default function CartService() {
  const cart = useSelector(selectCart);

  const totalPrice = cart.reduce((acc, cartItem) => 
    acc + parseFloat(cartItem.product.price_new) * cartItem.quantity, 0);

  const productsQuantity = cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity
  }, 0);

  const withoutDiscount = cart.reduce((acc, cartItem) => 
    acc + parseFloat(cartItem.product.price_old) * cartItem.quantity, 0);

  const discount = parseFloat((withoutDiscount - totalPrice).toFixed(2));

  return { totalPrice, productsQuantity, discount }
};

