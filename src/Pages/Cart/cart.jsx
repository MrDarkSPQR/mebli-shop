// Cart.jsx
import React, { useState } from "react";
import "./cart.css";

const initialCartItems = [
  {
    id: "chair-1",
    name: "Стілець Раковець",
    description: "Елегантний дерев'яний стілець у стилі Раковець",
    image: "https://via.placeholder.com/80", // заміни на реальне зображення
    price: 899,
    quantity: 1,
    isSelected: true,
  },
  {
    id: "table-1",
    name: "Стіл Буковель",
    description: "Сучасний дерев'яний стіл з натурального бука",
    image: "https://via.placeholder.com/80", // заміни на реальне зображення
    price: 1899,
    quantity: 1,
    isSelected: true,
  },
];

function Cart() {
  const [items, setItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectItem = (id, isSelected) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected } : item
      )
    );
  };

  const total = items
    .filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-modal-content">
      <h2>Кошик</h2>
      {items.length === 0 ? (
        <div className="cart-empty">Кошик порожній</div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="cart-item">
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={(e) => handleSelectItem(item.id, e.target.checked)}
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
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button className="cart-item-remove" onClick={() => handleRemoveItem(item.id)}>✖</button>
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
