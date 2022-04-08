// import { ErrorMessage } from "@hookform/error-message";
// import { FieldError } from "react-hook-form";

import { ChangeEventHandler } from "react";

interface Props {
  error: string | undefined;
  name: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: string;
}

const FormInput = (props: Props) => {
  return (
    <div>
      <input
        {...props}
        type={props.type || "text"}
        className="w-full py-2 px-3 rounded-3 outline-0 bg-[#2D303E] text-white border-0 rounded-lg"
      />
      {props.error && <p className="text-xs text-red-600">{props.error}</p>}
    </div>
  );
};

export default FormInput;
