import Button from "./Button";
import CartContext from "../store/cart-context";
import { ModalContext } from "../store/modal-context";
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Input from "./Input";
import { useHttp } from "../hooks/useHttp";
import Modal from "./Modal";
import Error from "./Error";

const responseConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function CheckoutForm() {
  const { meals, resetCart } = useContext(CartContext);
  const { context, hideCheckout, showSuccess } = useContext(ModalContext);
  const {
    data: placedOrder,
    error,
    isLoading,
    sendHttp,
    clearData,
  } = useHttp("http://localhost:3000/orders", responseConfig);
  const cartTotal = meals.reduce(
    (acc, meal) => acc + meal.price * meal.quantity,
    0
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const orderData = {
      order: { items: meals, customer: data },
    };
    sendHttp(JSON.stringify(orderData));
    console.log("submitted");
  }

  function onCloseCheckout() {
    hideCheckout();
  }

  function onFinish() {
    hideCheckout();
    resetCart();
    clearData();
  }

  let actions = (
    <>
      <Button type="button" onClick={onCloseCheckout} textOnly>
        Close
      </Button>
      <Button type="submit">Submit</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Placing the order...</span>;
  }
  if (placedOrder && !error) {
    return (
      <Modal open={context === "checkout"} onClose={onFinish}>
        <h2>Success!!!</h2>
        <p>Your order was placed successfully...</p>
        <p className="modal-actions">
          <Button onClick={onFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      className="checkout"
      open={context === "checkout"}
      onClose={onCloseCheckout}
    >
      <h2>Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="control">
          Total amount:{currencyFormatter.format(cartTotal)}
        </div>

        <Input id="name" type="text" label="Full Name" />

        <Input id="email" type="email" label="Email Address" />

        <Input id="street" type="text" label="Street" />

        <div className="control-row">
          <Input id="postal-code" type="number" label="Postal Code" />

          <Input id="city" type="text" name="city" label="City" />
        </div>
        {error && <Error title="Failed to place order" message={error} />}

        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
