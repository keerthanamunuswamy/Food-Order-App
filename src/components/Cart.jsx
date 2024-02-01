import Button from "./Button";
import CartContext from "../store/cart-context";
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import { ModalContext } from "../store/modal-context";
import Modal from "./Modal";
export default function Cart() {
  const { meals, addToCart, updateCart } = useContext(CartContext);
  const { context, hideCart, showCheckout } = useContext(ModalContext);
  const cartTotal = meals.reduce(
    (acc, meal) => acc + meal.price * meal.quantity,
    0
  );
  function onCloseCart() {
    hideCart();
  }
  function onCheckout() {
    showCheckout();
  }
  return (
    <Modal className="cart" open={context === "cart"}>
      <h2>My Cart</h2>
      <div>
        {meals.length === 0 && <p>No meals in the cart!!</p>}
        {meals.length > 0 &&
          meals.map((meal) => {
            return (
              <li key={meal.id} className="cart-item">
                <div>
                  <span>{meal.name}</span>
                  <span> {currencyFormatter.format(meal.price)}</span>
                </div>
                <div className="cart-item-actions">
                  <Button onClick={() => updateCart(meal.id)}>-</Button>
                  <span>{meal.quantity}</span>
                  <Button onClick={() => addToCart(meal)}>+</Button>
                </div>
              </li>
            );
          })}

        <p className="cart-total">
          Cart Total: <strong>{currencyFormatter.format(cartTotal)}</strong>
        </p>
        <p className="modal-actions">
          <Button onClick={onCloseCart} textOnly>
            Close
          </Button>
          {meals.length > 0 && (
            <Button onClick={onCheckout}>Go to Checkout</Button>
          )}
        </p>
      </div>
    </Modal>
  );
}
