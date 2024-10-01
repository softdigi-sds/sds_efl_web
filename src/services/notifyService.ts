import { ToastOptions, toast } from "react-toastify";
import Swal, { SweetAlertOptions } from "sweetalert2";

const showNotification = (type: string, msg: string, options = {}) => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "smart-toaster",
  };
  const mergedOptions = { ...defaultOptions, ...options };
  if (type === "success") {
    return toast.success(msg, { ...mergedOptions });
  } else if (type === "error") {
    return toast.error(msg, { ...mergedOptions });
  } else if (type === "warn") {
    return toast.warn(msg, mergedOptions);
  } else if (type === "info") {
    return toast.info(msg, mergedOptions);
  }
};

const showAlert = (
  title: string,
  text: string,
  icon: SweetAlertOptions["icon"] = "info"
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

const showAlertAutoClose = (
  text: string,
  icon: SweetAlertOptions["icon"] = "info",
  timer = 2000
) => {  
  Swal.fire({
    title: "",
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: false,
  });
};

const showAlertAutoCloseHtml = (
  html: any,
  icon: SweetAlertOptions["icon"] = "info",
  timer = 20000
) => {
  Swal.fire({
    title: "",
    html: html,
    icon: icon,
    timer: timer,
    showConfirmButton: true,
  });
};

const showYesOrNoAlert = (
  text: string,
  call_back: any,
  icon: SweetAlertOptions["icon"]
) => {
  Swal.fire({
    title: "",
    icon: icon,
    text: text,
    showConfirmButton: true, // Show the "Yes" button
    showCancelButton: true, // Show the "No" button
    cancelButtonText: "No", // Text for the "No" button
    confirmButtonText: "Yes", // Text for the "Yes" button
    allowOutsideClick: false,
  }).then((result) => {
    // Handle the result after the user clicks on "Yes" or "No"
    if (result.isConfirmed) {
      call_back("yes");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      call_back("no");
    }
  });
};

export {
  showAlert,
  showAlertAutoClose,
  showAlertAutoCloseHtml,
  showNotification,
  showYesOrNoAlert
};

