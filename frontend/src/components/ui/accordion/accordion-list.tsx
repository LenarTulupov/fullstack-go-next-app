import { ReactNode } from 'react';
import styles from './accordion-list.module.scss';

interface IAccordionList {
  isAccordionOpened: boolean;
  children: ReactNode
}

export default function AccordionList({ isAccordionOpened, children }: IAccordionList) {
  return (
    <div className={`
      ${styles.accordion__list} 
      ${isAccordionOpened ? styles.accordion__list_opened : ''}
    `}>
      {children}
    </div>
  )
};
