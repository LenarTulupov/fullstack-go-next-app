import { ReactNode } from "react";
import styles from './accordion.module.scss';


interface IAccordion {
  title: string | ReactNode;
  image?: ReactNode
  children: ReactNode
  onClick: () => void;

}

export default function Accordion({ 
  title, image, children, onClick
}: IAccordion) {
  return (
    <div className={styles.accordion}>
        <button 
          className={styles.accordion__toggle}
          onClick={onClick}
        >
          { title } { image }
        </button>
        { children }
    </div>
  )
};
