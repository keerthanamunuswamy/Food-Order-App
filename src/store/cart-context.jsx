import { createContext, useReducer } from "react";

const CartContext = createContext({
  meals: [],
  addToCart: (meal) => {},
  updateCart: (mealId) => {},
  resetCart: () => {},
});

export function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedMeals = [...state.meals];
    const existingMealIndex = updatedMeals.findIndex(
      (meal) => meal.id === action.meal.id
    );
    const existingMeal = updatedMeals[existingMealIndex];

    if (existingMeal) {
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity + 1,
      };
      updatedMeals[existingMealIndex] = updatedMeal;
    } else {
      updatedMeals.push({ ...action.meal, quantity: 1 });
    }
    return { ...state, meals: updatedMeals };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedMeals = [...state.meals];
    const mealId = action.mealId;
    const updatedMealIndex = updatedMeals.findIndex(
      (item) => item.id === mealId
    );
    const existingMeal = updatedMeals[updatedMealIndex];

    if (existingMeal.quantity <= 1) {
      updatedMeals.splice(updatedMealIndex, 1);
    } else {
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity - 1,
      };
      updatedMeals[updatedMealIndex] = updatedMeal;
    }

    return {
      ...state,
      meals: updatedMeals,
    };
  }

  if (action.type === "RESET_CART") {
    return { ...state, meals: [] };
  }

  return state;
}
export function CartContextProvider({ children }) {
  const [cartState, cartStateDispatch] = useReducer(cartReducer, { meals: [] });
  function handleAddItemToCart(meal) {
    cartStateDispatch({ type: "ADD_ITEM", meal: meal });
  }
  function handleUpdateItemToCart(mealId) {
    cartStateDispatch({ type: "UPDATE_ITEM", mealId: mealId });
  }
  function handleResetCart() {
    cartStateDispatch({ type: "RESET_CART" });
  }
  const ctxValue = {
    meals: cartState.meals,
    addToCart: handleAddItemToCart,
    updateCart: handleUpdateItemToCart,
    resetCart: handleResetCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartContext;
