import styles from './favorite-button.module.scss'

interface IFavoriteButton {
  className?: string;
  onClick: () => void;
}

export default function FavoriteButton({ className, onClick }: IFavoriteButton ) {
  return (
    <button 
      className={`
        ${styles['favorite-button']} 
        ${className || ''}
      `}
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.22318 17.1147L9.22174 17.1134C6.62662 14.7602 4.55384 12.878 3.1178 11.1223C1.69324 9.38069 1 7.88574 1 6.32422C1 3.7965 2.97228 1.82422 5.5 1.82422C6.93721 1.82422 8.33224 2.49815 9.23865 3.56256L10 4.45662L10.7614 3.56256C11.6678 2.49815 13.0628 1.82422 14.5 1.82422C17.0277 1.82422 19 3.7965 19 6.32422C19 7.88575 18.3068 9.38075 16.882 11.1239C15.4459 12.8808 13.3734 14.7651 10.7786 17.1232C10.7782 17.1235 10.7778 17.1238 10.7775 17.1241L10.0026 17.8242L9.22318 17.1147Z"
          fill="white"
          stroke="currentColor"
          strokeWidth=".2"
        />
      </svg>
    </button>
  )
};
