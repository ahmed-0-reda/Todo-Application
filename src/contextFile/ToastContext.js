import { createContext, useContext } from "react";
import { useState } from "react";
import ToastAlert from "../components/ToastAlert";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState();

  function showHideAlert(msg) {
    setMsg(msg);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      <ToastContext.Provider value={{ showHideAlert }}>
        {children}
        <ToastAlert open={open} msg={msg} />
      </ToastContext.Provider>
    </>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};
