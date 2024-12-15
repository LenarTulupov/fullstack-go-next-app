import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux"

export default function useSizeChartPopup() {
  const dispach = useDispatch();

  const isSizeChartPopupOpened = useSelector((state: RootState) => state.sizeChartPopupState.isSizeChartPopupOpened);

  const toggleChartPopup = () => {
    reducer
  }
  return 
};
