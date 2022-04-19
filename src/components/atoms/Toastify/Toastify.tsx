import { enumToastify } from "@app/types/atom.type";
import { memo } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
type Props = {
  isShow: boolean;
  message: string;
  type: enumToastify;
};

const Toastify = ({ isShow, message,type }: Props) => {
  return (
    <div>
      {isShow &&type===enumToastify.success&&
        toast.success(message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })}
        {isShow &&type===enumToastify.error&&
        toast.error(message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })}
      <ToastContainer />
    </div>
  );
};

export default memo(Toastify);
