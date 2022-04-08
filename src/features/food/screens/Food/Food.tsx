import styles from "./Food.module.scss";
import cx from "classnames";
import { useState } from "react";
interface IFoodProps {
  name: string;
  price: number;
  description?: string;
  url_img: string;
  avaiable: number;
}
const Food = ({ name, price, url_img, avaiable }: IFoodProps) => {
  const [isHover, setIsHover] = useState(false);
  const addOrder = () => {};
  return (
    <div>
      <div
        className={cx(
          "bg-dark-3 rounded-2xl w-[12rem] h-[14rem] text-sm text-center cursor-pointer",
          styles.item
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex-center translate-y-[-2rem]">
          <img
            src={url_img}
            className="rounded-full w-[7.5rem] h-[7.5rem] object-cover"
            alt=""
          />
        </div>
        <p className="mx-6">{name}</p>
        <p className="mt-2 mb-1">$ {price}</p>
        <p>{avaiable} Bowls available</p>
        <button
          className={isHover ? styles.btnAdd : "hidden"}
          onClick={addOrder}
        >
          <span className="material-icons-outlined">add</span>
          Add To Order
        </button>
      </div>
    </div>
  );
};

export default Food;
