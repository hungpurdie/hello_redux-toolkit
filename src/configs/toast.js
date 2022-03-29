import { toast } from "react-toastify";

export const toastPosition = {
  topCenter: "top-center",
  bottomCenter: "bottom-center",
  topLeft: "top-left",
  bottomLeft: "bottom-left",
  topRight: "top-right",
  bottomRight: "bottom-right",
};

const showToast = (type, message, position, option) => {
  return toast[type](message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...option,
  });
};
export default showToast;
