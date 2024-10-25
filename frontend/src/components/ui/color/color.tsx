import styles from './color.module.scss';
import colors from '@/app/colors.module.scss'

interface IColor {
  color: string
}

export default function Color({ color }: IColor) {
  const selectedClass = colors[`color-${color}`];

  if (!selectedClass) {
    console.warn(`Color "${color}" is not defined in styles.`);
    return null;
  }
  return (
    <div className={`${styles.color} ${selectedClass}`}/>
  )
};




