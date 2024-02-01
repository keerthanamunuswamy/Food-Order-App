import { useContext, useRef } from "react";
import appLogo from "../assets/logo.jpg";
import Button from "./Button";

import CartContext from "../store/cart-context";
import { ModalContext } from "../store/modal-context";

export default function Header() {
  const { meals } = useContext(CartContext);
  const { showCart, showOrders } = useContext(ModalContext);

  function onShowCart() {
    showCart();
  }
  function onShowMyOrders() {
    showOrders();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={appLogo} alt="App logo" />
          <h1>Food Order App</h1>
        </div>
        <nav>
          <Button onClick={onShowMyOrders} textOnly>
            My Orders
          </Button>
          <Button onClick={onShowCart} textOnly>
            Cart({meals.length}){" "}
          </Button>
        </nav>
      </header>
    </>
  );
}
