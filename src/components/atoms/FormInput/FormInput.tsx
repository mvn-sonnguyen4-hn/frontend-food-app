import { ChangeEventHandler, memo } from "react";

interface Props {
  error?: string | undefined;
  name?: string;
  value?: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: string;
}

function FormInput(props: Props) {
  return (
    <>
      <input
        {...props}
        type={props.type || "text"}
        className="w-full py-2 px-3 rounded-3 outline-0 bg-[#2D303E] text-white border-0 rounded-lg no-croll"
      />
      {props.error && <p className="text-xs text-red-600">{props.error}</p>}
    </>
  );
}

export default memo(FormInput);
