import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = ComponentPropsWithoutRef<"dialog">;

export default forwardRef<ModalHandle, ModalProps>(function Modal(props, ref) {
  const modal = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current?.showModal();
      },

      close() {
        modal.current?.close();
      },
    };
  });

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(<dialog ref={modal} {...props} />, modalRoot);
});
