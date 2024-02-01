import Modal from "./Modal";
import { ModalContext } from "../store/modal-context";
import { useContext } from "react";
import { useHttp } from "../hooks/useHttp";
import Button from "./Button";
const requestConfig = {};

export default function MyOrders() {
  const { context, hideOrders } = useContext(ModalContext);
  const { data, error, isLoading } = useHttp(
    "http://localhost:3000/my-orders",
    requestConfig,
    []
  );
  function onOkay() {
    hideOrders();
  }
  return (
    <Modal open={context === "orders"}>
      <h2>My Orders</h2>
      {/* {data.orders.length > 0 && ( */}
      <ul>
        {data.orders.map((order) => {
          return (
            <li key={order.id}>
              {order.items.map((item) => {
                return <p>{item.name}</p>;
              })}
            </li>
          );
        })}
      </ul>
      {/* )} */}
      {console.log(data.orders)}

      {/* {!data.orders && <p>No orders yet...</p>} */}
      <p className="modal-actions">
        <Button onClick={onOkay} textOnly>
          Close
        </Button>
      </p>
    </Modal>
  );
}
