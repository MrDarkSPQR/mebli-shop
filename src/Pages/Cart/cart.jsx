import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./cart.css";

function Cart() {
  const { cartItems, removeFromCart, changeQuantity, toggleSelect } = useContext(CartContext);

  const total = cartItems
    .filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-modal-content">
      <h2>Кошик</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Кошик порожній</div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={(e) => toggleSelect(item.id, e.target.checked)}
            />
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <div className="cart-item-controls">
              <span>{item.price} грн</span>
              <div className="cart-item-quantity">
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
              </div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✖</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <span>{total} грн</span>
        <button className="cart-checkout-button">Оформити замовлення</button>
      </div>
    </div>
  );
}

export default Cart;
