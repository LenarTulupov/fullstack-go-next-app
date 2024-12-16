import { ChangeEvent, forwardRef, KeyboardEvent, Ref } from 'react';
import CloseButton from '../ui/close-button/close-button';
import SearchImage from '../ui/search-image/search-image';
import styles from './search-bar.module.scss'

interface ISearchBar {
  onClick: () => void;
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function SearchBar ({ 
  onClick, 
  className,
  value,
  onChange,
  onKeyDown }: ISearchBar, ref: Ref<HTMLInputElement>) {
  return (
    <div className={`${styles['search-bar']} ${className || ''}`}>
      <div className={styles['search-bar__block']}>
        <SearchImage variant='black' />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder='What are you looking for?'
          className={styles['search-bar__input']}
          onKeyDown={onKeyDown}
        />
        <CloseButton onClose={onClick} />
      </div>
    </div>
  )
};

export default forwardRef(SearchBar);
