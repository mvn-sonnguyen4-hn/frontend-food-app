import FormInput from '@app/components/atoms/FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import cx from 'classnames';
import { Fragment, useState } from 'react';
import {
  createOrder,
  changeAmountOrder,
  changeNoteOrder
} from '@app/features/orders/orders';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import styles from './ListOrder.module.scss';

interface IPropsListOrders {
  closeModal: Function;
}

function ListOrders({ closeModal }: IPropsListOrders) {
  const dispatch = useAppDispatch();
  const listOrders = useAppSelector(state => state.order.listOrder);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateOrders = async () => {
    setIsLoading(true);
    const data = listOrders.map(order => ({
      food: order.food,
      amount: order.amount,
      note: order.note
    }));
    const result = await createOrder(data);
    if (result) {
      setIsLoading(false);
      closeModal();
    }
  };

  const changeAmount = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    dispatch(
      changeAmountOrder({
        amount: Number(e.currentTarget.value),
        position: index
      })
    );
  };
  const changeNote = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    dispatch(changeNoteOrder({ note: e.currentTarget.value, position: index }));
  };

  // render list
  const renderListOrders = () => {
    const result = listOrders.map((order, index) => {
      const { food, amount, note } = order;
      return (
        <Fragment key={order.food?._id}>
          <tr>
            <td className="pt-6 w-[16.5rem]">
              <div className="flex items-center">
                <div className="w-[3rem] h-[3rem] object-cover mr-2">
                  <img
                    className="w-full h-full rounded-full"
                    src="http://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm">{food?.name}</p>
                  <p className="text-xs text-[#ABBBC2]">{food?.price}</p>
                </div>
              </div>
            </td>
            <td className="pt-3">
              <div className="w-full h-[28px]">
                <FormInput
                  type="number"
                  value={amount || 1}
                  onChange={e => changeAmount(e, index)}
                />
              </div>
            </td>
            <td className="align-middle pt-6 pl-4">
              <p className="whitespace-nowrap">$ 4,58</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="pt-2">
              <FormInput
                value={note ?? ''}
                onChange={e => changeNote(e, index)}
              />
            </td>
            <td className="flex-center pl-4 pt-2">
              <div className={cx('flex-center', styles.delete)}>
                <span className="material-icons-outlined">delete</span>
              </div>
            </td>
          </tr>
        </Fragment>
      );
    });
    return result;
  };
  return (
    <div>
      <div className="text-white">
        <p>Orders #34562</p>
        <table className="w-full">
          <thead>
            <tr className={cx(styles.divider)}>
              <td className="pb-6">Item</td>
              <td className="pb-6">Qty</td>
              <td className="pb-6">Price</td>
            </tr>
          </thead>
          <tbody>
            {renderListOrders()}
            <tr className={cx(styles.divider)} />
            <tr>
              <td colSpan={2}>Sub total</td>
              <td className="pl-4">21.1</td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn-primary w-full py-3 mt-7 flex-center outline-none border-none"
          onClick={handleCreateOrders}
        >
          {isLoading && <LoadingSpinner size={20} />}
          <span className="ml-1">Create order</span>
        </button>
      </div>
    </div>
  );
}

export default ListOrders;
