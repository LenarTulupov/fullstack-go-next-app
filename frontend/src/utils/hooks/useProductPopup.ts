import { productPopupState } from "@/store/product-popup/product-popup-slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function useProductPopup() {
  const dispatch = useDispatch();
  const isProductPopupOpened = useSelector(
    (state: RootState) => state.productPopupState.isProductPopupOpened
  );

  const handleProductPopupToggle = () => {
    dispatch(productPopupState());
  };
  return {
    isProductPopupOpened,
    handleProductPopupToggle,
  };
}
