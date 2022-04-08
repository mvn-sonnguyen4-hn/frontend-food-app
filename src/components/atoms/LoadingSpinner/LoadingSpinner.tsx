import styles from "./LoadingSpinner.module.scss";
interface ILoadingSpinnerProps {
  size?: Number;
}
const LoadingSpinner = ({ size }: ILoadingSpinnerProps) => {
  return <div className={styles.loader} style={{width:`${size}px`,height:`${size}px`}}></div>;
};

export default LoadingSpinner;
