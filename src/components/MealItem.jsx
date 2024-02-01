import Button from "./Button";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/cart-context";
import { useContext } from "react";
export default function MealItem({ id, name, price, description, image }) {
  const formattedPrice = currencyFormatter.format(price);
  const { addToCart } = useContext(CartContext);
  function onAdd() {
    addToCart({ id, name, price, description, image });
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <div>
            <h3>{name}</h3>
            <p className="meal-item-price">{formattedPrice}</p>
            <p className="meal-item-description">{description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={onAdd}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
