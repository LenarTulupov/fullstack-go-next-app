import { cartSidebarState } from "@/store/cart/cart-sidebar-state";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const dispatch = useDispatch();
  const isCartSidebarOpened = useSelector(
    (state: RootState) => state.cartSidebarState.isCartSidebarOpened
  );

  const handleCartSidebarToggle = () => {
    dispatch(cartSidebarState());
  };
  return { isCartSidebarOpened, handleCartSidebarToggle };
}
