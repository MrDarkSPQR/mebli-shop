import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./cart.css";

function Cart({ onClose, openPaymentModal, openMyOrdersModal }) {
  const { cartItems, removeFromCart, changeQuantity, toggleSelect } = useContext(CartContext);

  const selectedItems = cartItems.filter((item) => item.isSelected);
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    if (selectedItems.length === 0) {
      alert('Будь ласка, виберіть товари для оформлення замовлення.');
      return;
    }
    openPaymentModal(selectedItems, total);
  };

  return (
    <div className="cart-modal-content">
      <button className="my-orders-button" onClick={openMyOrdersModal}>Мої замовлення</button>
      <button className="auth-close" onClick={onClose}>✖</button>
      <h2>Кошик</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Кошик порожній</div>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={(e) => toggleSelect(item._id, e.target.checked)}
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
                <button onClick={() => changeQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item._id, 1)}>+</button>
              </div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>✖</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <span>Всього: {total} грн</span>
        <button className="cart-checkout-button" onClick={handleCheckoutClick}>Оформити замовлення</button>
      </div>
    </div>
  );
}

export default Cart;