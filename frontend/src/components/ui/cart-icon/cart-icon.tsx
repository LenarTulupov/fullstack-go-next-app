import { TbShoppingCartPlus } from "react-icons/tb";

interface ICartIcon {
  className?: string;
}

export default function CartIcon({ className }: ICartIcon) {
  return <TbShoppingCartPlus className={className || ''}/>
};
