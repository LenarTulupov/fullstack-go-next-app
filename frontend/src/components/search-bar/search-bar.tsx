import { forwardRef, Ref } from 'react';
import CloseButton from '../ui/close-button/close-button';
import SearchImage from '../ui/search-image/search-image';
import styles from './search-bar.module.scss'

interface ISearchBar {
  onClick: () => void;
  className?: string;
}

function SearchBar ({ 
  onClick, 
  className }: ISearchBar, ref: Ref<HTMLInputElement>) {
  return (
    <div className={`${styles['search-bar']} ${className || ''}`}>
      <div className={styles['search-bar__block']}>
        <SearchImage variant='black' />
        <input
          ref={ref}
          type="text"
          placeholder='What are you looking for?'
          className={styles['search-bar__input']}
        />
        <CloseButton onClick={onClick} />
      </div>
    </div>
  )
};

export default forwardRef(SearchBar);
