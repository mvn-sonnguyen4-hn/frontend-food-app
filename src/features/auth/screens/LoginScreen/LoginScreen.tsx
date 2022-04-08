import LoadingSpinner from "@app/components/atoms/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  login,
  LoginRequestDef,
  RegisterRequestDef,
} from "@app/features/auth/auth";
import { useAppDispatch } from "@app/redux/store";
import { useNavigate } from "react-router";
import FormInput from "@app/components/atoms/FormInput/FormInput";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isErr, setIsErr] = useState<Boolean>(false);
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { handleSubmit, setError, formState, control } = useForm<
    RegisterRequestDef | LoginRequestDef
  >({
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterRequestDef | LoginRequestDef> = async (
    data
  ) => {
    setIsLoading(true);
    const response = await dispatch(login(data));
    if (login.fulfilled.match(response)) {
      setIsLoading(false);
      navigate("/home");
    } else {
      setIsErr(true);
      setIsLoading(false);
      setError("username", {
        types: {
          required: "required",
          maxLength: "Max lengh",
        },
      });
    }
  };
  const onFocusInput= (e: React.FocusEvent<HTMLInputElement>) => {
    setIsErr(false);
  }
  return (
    <div className="bg-dark min-h-[100vh] min-w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-second px-6 w-[405px] rounded-lg"
      >
        <p className="text-left font-28 mt-6 text-white text-2xl">{isLogin?'Login':'Sign up'}</p>
        <p className="my-5 bg-[#393C49] w-full h-[1px]"></p>
        {!isLogin && (
          <>
            <div>
              <p className="text-white font-14 mb-1 text-sm">Firstname</p>
              <Controller
                control={control}
                name="first_name"
                rules={{
                  required: "Họ không được để trống.",
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error },
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
              <p className="text-white font-14 mb-1 text-sm">Lastname</p>
              <Controller
                control={control}
                name="last_name"
                rules={{
                  required: "Tên không được để trống.",
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error },
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
              required: "Username không được để trống.",
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
          <>
            <div className="mt-3">
              <p className="text-white font-14 mb-1 text-sm">Email</p>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Tài khoản không được để trống.",
                  maxLength: {
                    value: 20,
                    message: "Tài khoản không được vượt quá 20 ký tự.",
                  },
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error },
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
        <div className="mt-3">
          <p className="text-white font-14 mb-1 text-sm">Password</p>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Mật khẩu không được để trống.",
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
              <p className="text-white font-14 mb-1 text-sm">Address</p>
              <Controller
                control={control}
                name="address"
                rules={{
                  required: "Địa chỉ không được để trống.",
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error },
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
              <p className="text-white font-14 mb-1 text-sm">Phonenumber</p>
              <Controller
                control={control}
                name="phonenumber"
                rules={{
                  required: "Số điện thoại không được để trống.",
                }}
                render={({
                  field: { onChange, name },
                  fieldState: { error },
                }) => (
                  <FormInput
                    name={name}
                    error={error?.message}
                    onChange={onChange}
                    type="number"
                  />
                )}
              />
            </div>
          </>
        )}
        {isErr && (
          <p className="text-xs text-red-600">Sai tài khoản hoặc mật khẩu.</p>
        )}
        <p className="my-5 bg-[#393C49] w-full h-[1px]"></p>
        <button
          className={
            "btn-primary w-full text-white text-center bg-primary py-[14px] rounded-lg text-sm flex-center " +
            (!formState.isValid ? "disabl23" : "")
          }
          type="submit"
        >
          {isLoading && <LoadingSpinner size={20} />}
          <span className={isLoading ? "ml-1" : ""}>Sign in</span>
        </button>
        <p
          className="text-primary underline text-center mt-4 mb-5 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          Sign up
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
