import { sizesPopupState } from "@/store/sizes-popup/sizes-popup-slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function useSizesPopup() {
  const dispatch = useDispatch();
  const isSizesPopupOpened = useSelector(
    (state: RootState) => state.sizesPopupState.isSizesPopupOpened
  );

  const handleSizesPopup = () => {
    dispatch(sizesPopupState());
  };
  return { isSizesPopupOpened, handleSizesPopup };
}
