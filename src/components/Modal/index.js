import React, { useEffect } from "react";
import Portal from "./Portal";

const Modal = ({ children, open, onClose }) => {
  useEffect(() => {
    function onEsc(e) {
      if (e.keyCode === 27) {
        onclose();
      }
    }
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!open) return null;

  const onOverlayClick = () => {
    onClose();
  };

  const onDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        onClick={onOverlayClick}
        className="fixed inset-0 flex justify-center items-center w-full h-full backdrop-filter backdrop-blur-sm z-50"
      >
        <div
          onClick={onDialogClick}
          className="flex flex-col items-center w-5/12 h-auto bg-white rounded-xl lg:w-6/12 sm:mx-5 sm:w-auto"
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
