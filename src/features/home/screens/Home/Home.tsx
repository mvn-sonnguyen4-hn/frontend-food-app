import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import CustomModal from '@app/components/atoms/Modal/CustomModal';
import Menu from '@app/components/layouts/Menu/Menu';
import {
  FoodResponse,
  getFoodByPaginationAndCategoryType
} from '@app/features/food/food';
import Food from '@app/features/food/screens/Food/Food';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import OrderSidebar from '@app/features/orders/screens/OrderSidebar/OrderSidebar';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import { enumToastify } from '@app/types/atom.type';
import Pagination from '@app/components/atoms/Pagination/Pagination';

function Home() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  //state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const [listFood, setListFood] = useState<FoodResponse>({
    data: [],
    totalPage: 0,
    page: 0,
    limit: 0
  });
  const toastRef = useRef<any>();
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1
  });

  //handle pagination
  useEffect(() => {
    setIsLoading(true);
    setListFood({
      data: [],
      totalPage: 0,
      page: 0,
      limit: 0
    });
    const page = searchParams.get('page') || 1;
    const type = searchParams.get('type') || '';
    getFoodByPaginationAndCategoryType(Number(page), type)
      .then(res => {
        setIsLoading(false);
        setListFood(res.data);
        setPaginate({
          current: Number(res.data.page),
          total: Number(res.data.totalPage)
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [location]);

  // render list food
  const showListFood = () => {
    if (listFood.data.length > 0) {
      const result = listFood.data.map((f, index) => (
        <Food
          key={index}
          _id={f._id}
          name={f.name}
          price={f.price}
          avaiable={f.avaiable}
          url_img={f.url_img}
          createOrder={addOder}
        />
      ));
      return result;
    }
  };

  // handle modal
  const closeModalAndNotify = (success: boolean = false) => {
    setIsShow(false);
    if (success) {
      setStatusToast({
        message: 'Create order success',
        type: enumToastify.success
      });
    } else {
      setStatusToast({
        message: 'Create order fail',
        type: enumToastify.error
      });
    }
    toastRef.current.showToast();
  };
  const closeModal = () => {
    setIsShow(false);
  };
  const addOder = () => {
    setIsShow(true);
  };

  return (
    <div className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <p className="text-3xl">Jaegar Resto</p>
      <p className="mb-6 mt-1">Tuesday, 2 Feb 2021</p>
      <p className="mb-4 mt-6 text-xl font-bold">Choose Dishes</p>
      <Menu />
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
      <CustomModal isShow={isShow} closeModal={closeModal}>
        <OrderSidebar closeModalAndNotify={closeModalAndNotify} />
      </CustomModal>
      {isLoading && (
        <div className="flex justify-center">
          {' '}
          <LoadingSpinner size={40} primaryColor />
        </div>
      )}
      <div className="grid grid-cols-192 place-content-between gap-10 mb-12">
        {showListFood()}
      </div>
      <Pagination totalPage={paginate.total} currentPage={paginate.current} />
    </div>
  );
}

export default Home;
