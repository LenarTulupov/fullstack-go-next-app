import { searchBarInputValueState } from "@/store/search-bar-input-value/search-bar-input-value-slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export function useSearchBarValue() {
  return useSelector(
    (state: RootState) => state.searchBarInputValueState.searchBarInputValue
  );
}

export function useSetSearchBarValue() {
  const dispatch = useDispatch();
  return (value: string) => dispatch(searchBarInputValueState(value));
}
