import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  login,
  LoginRequestDef,
  RegisterRequestDef
} from '@app/features/auth/auth';
import { useAppDispatch } from '@app/redux/store';
import { useNavigate } from 'react-router';
import FormInput from '@app/components/atoms/FormInput/FormInput';
import { register } from '../../redux/auth.slice';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isErrLogin, setIsErrLogin] = useState<Boolean>(false);
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { handleSubmit, formState, control } = useForm<
    RegisterRequestDef | LoginRequestDef
  >({
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<
    RegisterRequestDef | LoginRequestDef
  > = async data => {
    setIsLoading(true);
    if (isLogin) {
      const response = await dispatch(login(data as LoginRequestDef));
      if (login.fulfilled.match(response)) {
        setIsLoading(false);
        navigate('/home');
      } else {
        setIsErrLogin(true);
        setIsLoading(false);
      }
    } else {
      const response = await dispatch(register(data as RegisterRequestDef));
      if (register.fulfilled.match(response)) {
        setIsLoading(false);
        navigate('/home');
      } else {
        setIsErrLogin(true);
        setIsLoading(false);
      }
    }
  };
  const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsErrLogin(false);
  };
  return (
    <div className="bg-dark min-h-[100vh] min-w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-second px-6 w-[405px] rounded-lg"
      >
        <p className="text-left font-28 mt-6 text-white text-2xl">
          {isLogin ? 'Đăng nhập' : 'Đăng kí'}
        </p>
        <p className="my-5 bg-[#393C49] w-full h-[1px]" />
        {!isLogin && (
          <>
            <div>
              <p className="text-white font-14 mb-1 text-sm">Họ</p>
              <Controller
                control={control}
                name="first_name"
                rules={{
                  required: 'Họ không được để trống.'
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error }
                }) => (
                  <FormInput
                    name={name}
                    error={error?.message}
                    onChange={onChange}
                    type="text"
                  />
                )}
              />
            </div>
            <div className="mt-3">
              <p className="text-white font-14 mb-1 text-sm">Tên</p>
              <Controller
                control={control}
                name="last_name"
                rules={{
                  required: 'Tên không được để trống.'
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error }
                }) => (
                  <FormInput
                    name={name}
                    error={error?.message}
                    onChange={onChange}
                    type="text"
                  />
                )}
              />
            </div>
          </>
        )}
        <div className="mt-3">
          <p className="text-white font-14 mb-1 text-sm">Username</p>
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Username không được để trống.'
            }}
            render={({ field: { onChange, name }, fieldState: { error } }) => (
              <FormInput
                name={name}
                error={error?.message}
                onChange={onChange}
                onFocus={onFocusInput}
                type="text"
              />
            )}
          />
        </div>
        {/* check login */}
        {!isLogin && (
          <div className="mt-3">
            <p className="text-white font-14 mb-1 text-sm">Email</p>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Tài khoản không được để trống.',
                maxLength: {
                  value: 100,
                  message: 'Email không được vượt quá 100 ký tự.'
                }
              }}
              render={({
                field: { onChange, name },
                fieldState: { error }
              }) => (
                <FormInput
                  name={name}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        )}
        <div className="mt-3">
          <p className="text-white font-14 mb-1 text-sm">Mật khẩu</p>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Mật khẩu không được để trống.'
            }}
            render={({ field: { onChange, name }, fieldState: { error } }) => (
              <FormInput
                name={name}
                error={error?.message}
                onChange={onChange}
                onFocus={onFocusInput}
                type="password"
              />
            )}
          />
        </div>

        {/* check login */}
        {!isLogin && (
          <>
            <div className="mt-3">
              <p className="text-white font-14 mb-1 text-sm">Địa chỉ</p>
              <Controller
                control={control}
                name="address"
                rules={{
                  required: 'Địa chỉ không được để trống.'
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error }
                }) => (
                  <FormInput
                    name={name}
                    error={error?.message}
                    onChange={onChange}
                    type="text"
                  />
                )}
              />
            </div>
            <div className="mt-3">
              <p className="text-white font-14 mb-1 text-sm">Số điện thoại</p>
              <Controller
                control={control}
                name="phonenumber"
                rules={{
                  required: 'Số điện thoại không được để trống.',
                  pattern: {
                    value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    message: 'Số điện thoại không hợp lệ'
                  }
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error }
                }) => (
                  <FormInput
                    name={name}
                    error={error?.message}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </>
        )}
        {isErrLogin && (
          <p className="text-xs text-red-600">Sai tài khoản hoặc mật khẩu.</p>
        )}
        <p className="my-5 bg-[#393C49] w-full h-[1px]" />
        <button
          className={`btn-primary w-full text-white text-center bg-primary py-[14px] rounded-lg text-sm flex-center ${
            !formState.isValid ? 'disable' : ''
          }`}
          type="submit"
        >
          {isLoading && <LoadingSpinner size={20} />}
          <span className={isLoading ? 'ml-1' : ''}>
            {!isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </button>
        <p
          className="text-primary underline text-center mt-4 mb-5 cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setIsErrLogin(false);
          }}
        >
          {isLogin ? 'Đăng kí' : 'Đăng nhập'}
        </p>
      </form>
      <div></div>
      <p
        className="text-primary underline cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </p>
    </div>
  );
}

export default LoginScreen;
