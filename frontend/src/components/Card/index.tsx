import styles from './index.module.css';

const Card = (props: Props) => {
  return<div className={styles.container}>
    <img src={props.imageUrl}/>
    
  </div>
}
export default Card;

interface Props{
  imageUrl: string;
  name: string;
}