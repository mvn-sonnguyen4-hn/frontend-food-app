import Checkbox from '@app/components/atoms/Checkbox/Checkbox';
import { useState } from 'react';
import styles from './Orders.module.scss';

const Orders = () => {
  const [check, setCheck] = useState(false);
  const changeChecked = () => {
    setCheck(!check);
  };
  return (
    <div className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <p className="text-3xl">Orders</p>
      <div className="bg-[#393C49] w-full h-[1px] mt-6"></div>
      <div className="bg-dark-second mt-6 rounded-lg">
        <div className="flex justify-between px-10 pt-7 mb-6">
          <p className="font-semibold text-xl">Order Report</p>
          <button className="bg-red-main text-white flex items-center rounded-lg px-3 py-1">
            <span className="material-icons-outlined text-xl translate-y-[-1px]">
              delete
            </span>
            <span className="ml-1 text-base font-semibold">Delete</span>
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>
                <Checkbox isChecked={check} changeChecked={changeChecked} />
              </td>
              <td>Order By</td>
              <td>Menu</td>
              <td>Total Payment</td>
              <td>Created Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="bg-[#393C49] w-full h-[1px] mt-6 mb-7"></div>
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox isChecked={check} changeChecked={changeChecked} />
              </td>
              <td>Eren Jaegar</td>
              <td>Spicy seasoned seafood noodles </td>
              <td>$125</td>
              <td>01/01/2022 10:10</td>
              <td>
                <button>asdas</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
