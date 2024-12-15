import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux"

export default function useSizeChartPopup() {
  const dispatch = useDispatch();

  const isSizeChartPopupOpened = useSelector((state: RootState) => state.sizeChartPopupState.isSizeChartPopupOpened);

  const toggleChartPopup = () => {
    dispatch()
  }
  return 
};
