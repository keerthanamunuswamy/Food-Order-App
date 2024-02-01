import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/cart-context";
import ModalContextProvider, { ModalContext } from "./store/modal-context";
import Checkout from "./components/CheckoutForm";
import MyOrders from "./components/MyOrders";

function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <MyOrders />
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
