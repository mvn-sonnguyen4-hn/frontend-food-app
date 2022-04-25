import Checkbox from '@app/components/atoms/Checkbox/Checkbox';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  addListOrder,
  getOrdersByUser,
  OrderDetailDef,
  removeOrders
} from '../../orders';
import styles from './Orders.module.scss';
import moment from 'moment';
import Pagination from '@app/components/atoms/Pagination/Pagination';
import { ButtonsOrder } from '../../constants/order.btn';
import { useSearchParams, useLocation } from 'react-router-dom';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import CustomModal from '@app/components/atoms/Modal/CustomModal';
import OrderSidebar from '../OrderSidebar/OrderSidebar';
import { useAppDispatch } from '@app/redux/store';
import { formatCurrency } from '@app/utils/functions';
import { enumToastify } from '@app/types/atom.type';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import Modal from 'react-modal';

const Orders = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [listOrders, setListOrders] = useState<OrderDetailDef[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const toastRef = useRef<any>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1
  });
  const countDeleteOrders = useMemo(() => {
    return listOrders.filter(item => item.isChecked).length;
  }, [listOrders]);
  //redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
  }, [location]);
  const getData = async () => {
    setIsLoading(true);
    const page = searchParams.get('page') || 1;
    const result = await getOrdersByUser(Number(page));
    if (result.status === 200) {
      setListOrders(result.data.data);
      setPaginate({
        current: result.data.page,
        total: result.data.totalPage
      });
    }
    setIsLoading(false);
  };
  const checkedAll = () => {
    setIsCheckAll(!isCheckAll);
    const listOrderChange = listOrders.map(order => {
      order.isChecked = !isCheckAll;
      return order;
    });
    setListOrders(listOrderChange);
  };
  const changeChecked = (id: string) => {
    setIsCheckAll(false);
    const listOrderChange = listOrders.map(order => {
      if (!order.isChecked) {
        order.isChecked = false;
      }
      if (order._id === id) {
        order.isChecked = !order.isChecked;
      }
      return order;
    });
    setListOrders(listOrderChange);
  };
  const chooseOrder = (order: OrderDetailDef) => {
    dispatch(
      addListOrder({
        status: order.status,
        createAt: order.createdAt,
        username: order.user.username,
        listOrders: order.foods,
        _id: order._id
      })
    );
    setIsShowModal(true);
  };
  const closeModalAndNotify = (success = false) => {
    setIsShowModal(false);
    if (success) {
      setStatusToast({
        message: 'Update order success',
        type: enumToastify.success
      });
      getData();
    } else {
      setStatusToast({
        message: 'Update order fail',
        type: enumToastify.error
      });
    }
    toastRef.current.showToast();
  };
  const handleDeleteOrders = async () => {
    setIsLoading(true);
    const listId = listOrders
      .filter(order => order.isChecked)
      .map(order => order._id);
    if (listId.length === 0) {
      setStatusToast({
        message: 'Vui lòng chọn ít nhất 1 order',
        type: enumToastify.error
      });
      toastRef.current.showToast();
      return;
    }
    const result = await dispatch(removeOrders(listId));
    setIsShowModalDelete(false);
    if (removeOrders.fulfilled.match(result)) {
      setStatusToast({
        message: 'Xóa thành công',
        type: enumToastify.success
      });
      toastRef.current.showToast();
      getData();
    } else {
      setStatusToast({
        message: 'Xóa thất bại',
        type: enumToastify.error
      });
      toastRef.current.showToast();
    }
    setIsLoading(false);
  };

  const renderListOrders = () => {
    if (listOrders.length < 1) {
      return null;
    }
    const result = listOrders.map(order => {
      const nameOrder = order.foods.map(food => food.food?.name);
      let total = 0;
      order.foods.forEach(food => {
        total += (food.amount ?? 0) * (food.food?.price ?? 0);
      });
      const btn = ButtonsOrder.find(btn => btn.type === order.status);
      return (
        <Fragment key={order._id}>
          <tr>
            <td className="py-3">
              <div className="ml-3">
                <Checkbox
                  isChecked={order.isChecked ?? false}
                  changeChecked={() => changeChecked(order._id)}
                />
              </div>
            </td>
            <td onClick={() => chooseOrder(order)}>{order.user.username}</td>
            <td onClick={() => chooseOrder(order)}>{nameOrder.join(',')}</td>
            <td onClick={() => chooseOrder(order)}>{formatCurrency(total)}</td>
            <td onClick={() => chooseOrder(order)}>
              {moment(order.createdAt).format('DD/MM/YYYY')} -{' '}
              {moment(order.createdAt).format('LT')}
            </td>
            <td onClick={() => chooseOrder(order)}>
              <button
                className="py-1 rounded-3xl flex-center w-[7rem]"
                style={{ background: btn?.background, color: btn?.color }}
              >
                {btn?.type}
              </button>
            </td>
          </tr>
        </Fragment>
      );
    });
    return result;
  };

  return (
    <div className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <p className="text-3xl">Orders</p>
      <div className="bg-[#393C49] w-full h-[1px] mt-6"></div>
      <div className="bg-dark-second mt-6 rounded-lg min-h-[700px]">
        {isLoading ? (
          <div
            className="flex-center"
            style={{ transform: 'translateY(360px)' }}
          >
            <LoadingSpinner size={40} primaryColor />
          </div>
        ) : (
          <>
            <div className="flex justify-between px-10 pt-7 mb-6">
              <p className="font-semibold text-xl">Order Report</p>
              <button
                className="bg-red-main text-white flex items-center rounded-lg px-3 py-1"
                onClick={() => setIsShowModalDelete(true)}
              >
                <span className="material-icons-outlined text-xl translate-y-[-1px]">
                  delete
                </span>
                <span className="ml-1 text-base font-semibold">Delete</span>
              </button>
            </div>
            <div className={styles.box}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td>
                      <div className="ml-3 py-3">
                        <Checkbox
                          isChecked={isCheckAll}
                          changeChecked={checkedAll}
                        />
                      </div>
                    </td>
                    <td>Order By</td>
                    <td>Menu</td>
                    <td>Total Payment</td>
                    <td>Created Date</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {listOrders.length > 0 && (
                    <>
                      <tr>
                        <td colSpan={6}>
                          <div className="bg-[#393C49] w-full h-[1px] mt-6 mb-7"></div>
                        </td>
                      </tr>
                      {renderListOrders()}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* pagination */}
      <Pagination totalPage={paginate.total} currentPage={paginate.current} />
      <CustomModal
        isShow={isShowModal}
        closeModal={() => setIsShowModal(false)}
      >
        <OrderSidebar closeModalAndNotify={closeModalAndNotify} isEdit />
      </CustomModal>
      <Modal
        isOpen={isShowModalDelete}
        onRequestClose={() => setIsShowModalDelete(false)}
        shouldCloseOnOverlayClick
        style={{
          overlay: {
            background: 'rgba(0,0,0,0.6)',
            cursor: 'pointer'
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: '#1F1D2B',
            width: '410px',
            border: 'none',
            borderRadius: '1rem',
            height: 'fit-content'
          }
        }}
      >
        <div className="bg-dark-second rounded-2xl text-white mt-4">
          <p className="font-semibold text-2xl">Confirm Deletion</p>
          <p className="text-sm mt-9">
            Are you sure you want to delete the {countDeleteOrders} selected
            items?{' '}
          </p>
          <div className="flex justify-end items-center mt-10 gap-3">
            <button
              className="btn-primary-outline w-[100px] font-semibold"
              onClick={() => setIsShowModalDelete(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary w-[100px] font-semibold flex-center"
              onClick={handleDeleteOrders}
            >
              {isLoading && <LoadingSpinner size={20} />}
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
    </div>
  );
};

export default Orders;