import { createContext, useState } from "react";

export const ModalContext = createContext({
  context: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showOrders: () => {},
  hideOrders: () => {},
});

export default function ModalContextProvider({ children }) {
  const [userModal, setUserModal] = useState("");
  function showCart() {
    setUserModal("cart");
  }
  function hideCart() {
    setUserModal("");
  }
  function showCheckout() {
    setUserModal("checkout");
  }
  function hideCheckout() {
    setUserModal("");
  }
  function showOrders() {
    setUserModal("orders");
  }
  function hideOrders() {
    setUserModal("");
  }
  const ctxValue = {
    context: userModal,
    showCart: showCart,
    hideCart: hideCart,
    showCheckout: showCheckout,
    hideCheckout: hideCheckout,
    showOrders: showOrders,
    hideOrders: hideOrders,
  };

  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}
