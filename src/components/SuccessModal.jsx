import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import Button from "./Button";
export default function SuccessModal() {
  const { hideSuccess, hideCheckout } = useContext(ModalContext);
  function onOkay() {
    hideCheckout();
    hideSuccess();
  }
  return (
    <>
      <p>Your order was placed successfully...</p>
      <p className="modal-actions">
        <Button onClick={onOkay}>Okay</Button>
      </p>
    </>
  );
}
