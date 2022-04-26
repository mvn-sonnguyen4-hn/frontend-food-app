import FormInput from '@app/components/atoms/FormInput/FormInput';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import { URL_IMAGE_DEFAULT } from '@app/constants/env';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { enumToastify } from '@app/types/atom.type';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateUserInfo } from '../../auth';

const SettingsScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const toastRef = useRef<any>();
  const [img_url, setImgUrl] = useState('');
  const { handleSubmit, control } = useForm<any>({
    mode: 'onChange'
  });
  const inputFileRef = useRef<any>(null);

  const onSubmit: SubmitHandler<any> = async data => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (inputFileRef.current.files[0]) {
      formData.append('file', inputFileRef.current.files[0]);
    } else {
      formData.append('avatar_url', user?.avatar_url ?? '');
    }
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('username', data.username);
    formData.append('phonenumber', data.phonenumber);
    formData.append('address', data.address);
    formData.append('email', user?.email ?? '');
    const result = await dispatch(updateUserInfo(formData));
    if (updateUserInfo.fulfilled.match(result)) {
      setStatusToast({
        message: 'Update success',
        type: enumToastify.success
      });
    } else {
      setStatusToast({
        message: 'Update fail',
        type: enumToastify.error
      });
    }
    toastRef.current.showToast();
    setIsLoading(false);
  };
  const showInput = () => {
    if (!user) {
      return null;
    }
    const dataInput = [
      {
        label: 'Firstname',
        name: 'first_name',
        rules: {
          required: 'Họ không được để trống.'
        },
        value: user?.first_name
      },
      {
        label: 'Lastname',
        name: 'last_name',
        rules: {
          required: 'Ten không được để trống.'
        },
        value: user?.last_name
      },
      {
        label: 'Username',
        name: 'username',
        rules: {
          required: 'Username không được để trống.'
        },
        value: user?.username
      },
      {
        label: 'Address',
        name: 'address',
        rules: {
          required: 'Dia chi không được để trống.'
        },
        value: user?.address
      },
      {
        label: 'Phonenumber',
        name: 'phonenumber',
        rules: {
          required: 'So dien thoai không được để trống.'
        },
        value: user?.phonenumber
      }
    ];
    const result = dataInput.map(item => {
      return (
        <div key={item.name}>
          <p className="text-white font-14 mb-1 text-sm mt-3">{item.label}:</p>
          <Controller
            defaultValue={item.value}
            control={control}
            name={item.name}
            rules={item.rules}
            render={({
              field: { onChange, name, value = item.value },
              fieldState: { error }
            }) => {
              return (
                <FormInput
                  name={name}
                  value={value}
                  error={error?.message}
                  onChange={onChange}
                  type="text"
                />
              );
            }}
          />
        </div>
      );
    });
    return result;
  };
  const clickInputFile = () => {
    inputFileRef.current.click();
  };
  const changeAvatar = () => {
    const [file] = inputFileRef.current.files;
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
    return;
  };
  return (
    <section className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-second rounded-2xl"
      >
        <p className="text-center text-3xl pt-6 pb-7">Info User</p>
        <div className="flex justify-around">
          <div className="basis-[30%]">{showInput()}</div>
          <div className="text-center">
            <div
              className={`h-[fit-content] rounded-full ${
                !user || !user.avatar_url
                  ? 'border-[1px] border-primary border-solid '
                  : ''
              }`}
            >
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={
                  img_url
                    ? img_url
                    : user && user.avatar_url
                    ? user?.avatar_url
                    : URL_IMAGE_DEFAULT
                }
                alt=""
              />
            </div>
            <button
              className="mt-5 btn-primary-outline px-5 rounded-3xl py-2 outline-none"
              onClick={clickInputFile}
              type="button"
            >
              Change avatar
            </button>
          </div>
        </div>
        <div className="flex-center mt-[100px] pb-10">
          <button
            className={`btn-primary text-white text-center bg-primary py-[14px] rounded-lg text-sm flex-center w-[300px] cursor-pointer `}
            type="submit"
          >
            {isLoading && <LoadingSpinner size={20} />}
            <span className={isLoading ? 'ml-1' : ''}>Change</span>
          </button>
        </div>
      </form>
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        onChange={changeAvatar}
      />
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
    </section>
  );
};

export default SettingsScreen;
