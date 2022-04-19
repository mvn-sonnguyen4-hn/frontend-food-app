import styles from "./LoadingSpinner.module.scss";
import cx from "classnames";
import { memo } from "react";
interface ILoadingSpinnerProps {
  size?: Number;
  primaryColor?: Boolean;
}
const LoadingSpinner = ({ size, primaryColor }: ILoadingSpinnerProps) => {
  return (
    <div
      className={
        primaryColor ? cx(styles.loader, styles.loader__primary) : styles.loader
      }
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};

export default memo(LoadingSpinner);
