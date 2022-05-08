import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import Menu from '@app/components/layouts/Menu/Menu';
import {
  addFood,
  FoodResponse,
  getFoodByPaginationAndCategoryType
} from '@app/features/food/food';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { formatCurrency } from '@app/utils/functions';
import { useAppSelector } from '@app/redux/store';
import CustomModal from '@app/components/atoms/Modal/CustomModal';
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@app/components/atoms/FormInput/FormInput';
import CustomSelect from '@app/components/atoms/CustomSelect/CustomSelect';
import { enumToastify } from '@app/types/atom.type';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import Pagination from '@app/components/atoms/Pagination/Pagination';

function Setting() {
  const categories = useAppSelector(state => state.category.categories);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const inputImage = useRef<any>();
  const [fileData, setFileData] = useState<any>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toastRef = useRef<any>();
  const location = useLocation();
  const [listFood, setListFood] = useState<FoodResponse>({
    data: [],
    totalPage: 0,
    page: 0,
    limit: 0
  });
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1
  });
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getData();
  }, [location]);
  const getData = () => {
    setIsLoading(true);
    setListFood({
      data: [],
      totalPage: 0,
      page: 0,
      limit: 0
    });
    const page = searchParams.get('page') || 1;
    const type =
      searchParams.get('type') || (categories[0] && categories[0].name) || '';
    const keyword = searchParams.get('keyword') || '';
    getFoodByPaginationAndCategoryType(Number(page), type, keyword)
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
  };
  const renderFood = () => {
    const result = listFood.data.map(food => {
      return (
        <div
          className="text-center border-solid-gray rounded-lg"
          key={food._id}
        >
          <div className="mb-3 flex-center mt-6">
            <img
              className="w-[130px] h-[130px] rounded-full object-cover"
              src={food.url_img}
              alt=""
            />
          </div>
          <p className="px-3">{food.name}</p>
          <p className="mb-4 mt-2 text-[#ABBBC2]">
            {formatCurrency(food.price)}
          </p>
          <button className="flex-center w-full bg-[#50343A] text-[#EA7C69] py-4 rounded-b-lg cursor-pointer">
            <span className="material-icons-outlined">edit</span>Sửa món ăn
          </button>
        </div>
      );
    });
    return result;
  };

  const { handleSubmit, formState, control } = useForm<any>({
    mode: 'onChange'
  });
  const [category, setCategory] = useState<any>({
    title: categories.length > 0 ? categories[0].name : '',
    value: categories.length > 0 ? categories[0]._id : ''
  });
  const onChangeFileImage = (e: any) => {
    setFileData(e);
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      setUrlImage(URL.createObjectURL(file));
    };
  };
  const onSubmit = async (data: any) => {
    setIsLoadingButton(true);
    const formData = new FormData();
    formData.append('name', data.food_name);
    formData.append('price', data.food_price);
    formData.append('category_id', category.value);
    formData.append('file', fileData.target.files[0]);
    const result = await addFood(formData);
    if (result) {
      closeModal();
      setStatusToast({
        type: enumToastify.success,
        message: 'Thêm món ăn thành công'
      });
    } else {
      closeModal();
      setStatusToast({
        type: enumToastify.error,
        message: 'Thêm món ăn thất bại'
      });
    }
    toastRef.current.showToast();
    getData();
    setIsLoadingButton(false);
  };

  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="bg-dark min-h-[100vh] text-white px-8">
      <p className="text-3xl mb-6 pt-6">Settings</p>
      <div className="bg-dark-second px-6 py-9 rounded-lg">
        <div className="flex justify-between items-center mb-8z">
          <p className="text-2xl">Quản lý thực đơn</p>
          <div className="flex">
            <button className="flex px-2 py-1 bg-[#9D0505] rounded-lg mr-4">
              <span className="material-icons-outlined">delete</span>
              Xóa món ăn
            </button>
            <button className="flex px-2 py-1 border-solid-gray rounded-lg">
              <span className="material-icons-outlined">category</span>
              <span>Quản lý thể loại</span>
            </button>
          </div>
        </div>
        <Menu />
        {isLoading && (
          <div className="flex justify-center">
            {' '}
            <LoadingSpinner size={40} primaryColor />
          </div>
        )}
        <div className="grid grid-cols-192 place-content-between gap-3 mb-12">
          <div
            className="text-center border-dashed-primary rounded-lg text-primary flex-center flex-col cursor-pointer min-h-[296px]"
            onClick={() => setShowModal(true)}
          >
            <span className="material-icons-outlined mb-3 text-3xl">add</span>
            <p>Thêm món ăn</p>
          </div>
          {renderFood()}
        </div>
      </div>
      <CustomModal isShow={showModal} closeModal={closeModal}>
        <p className="font-semibold text-3xl text-white mt-16">Thêm sản phẩm</p>
        <p className="h-[1px] w-full bg-[#393C49] mt-8 mb-5"></p>
        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
          <p className="mb-1">Thể loại:</p>
          <CustomSelect
            width={200}
            data={
              categories.length > 0
                ? categories.map(item => {
                    return {
                      value: item._id,
                      title: item.name
                    };
                  })
                : []
            }
            value={category}
            onChange={(category: any) => setCategory(category)}
          />
          <p className="mt-4">Tên món ăn:</p>
          <Controller
            control={control}
            name="food_name"
            rules={{
              required: 'Tên món ăn không được để trống.'
            }}
            render={({ field: { onChange, name }, fieldState: { error } }) => (
              <FormInput
                name={name}
                error={error?.message}
                onChange={onChange}
                type="text"
              />
            )}
          />
          <p className="mt-4">Giá:</p>
          <Controller
            control={control}
            name="food_price"
            rules={{
              required: 'Giá không được để trống.',
              pattern: {
                value: /^[0-9_\s]+$/,
                message: 'Giá phải là một số nguyên lớn hơn 0.'
              }
            }}
            render={({ field: { onChange, name }, fieldState: { error } }) => (
              <FormInput
                name={name}
                error={error?.message}
                onChange={onChange}
                type="number"
              />
            )}
          />
          <p className="mt-4">Ảnh:</p>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn-primary w-[100px]"
              onClick={() => inputImage.current.click()}
            >
              Thêm ảnh
            </button>
            <input
              ref={inputImage}
              type="file"
              hidden
              onChange={onChangeFileImage}
            />
            {urlImage && (
              <img
                src={urlImage}
                alt=""
                className="w-[7rem] h-[7rem] rounded-xl object-cover"
              />
            )}
          </div>
          <div className="flex gap-3 mt-9">
            <button
              type="button"
              className="btn-primary-outline flex-1"
              onClick={closeModal}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!formState.isValid}
              className={`btn-primary flex-center flex-1 ${
                !formState.isValid || !fileData || !category.value
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }`}
            >
              {isLoadingButton && <LoadingSpinner size={20} />}
              Tạo
            </button>
          </div>
        </form>
      </CustomModal>
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
      <Pagination totalPage={paginate.total} currentPage={paginate.current} />
    </div>
  );
}

export default Setting;
