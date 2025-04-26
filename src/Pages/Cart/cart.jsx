import React from "react";
import "./cart.css";

function Cart() {

    const cartItem = {
        id: "rakovets-1",
        name: "Стілець Раковець",
        description: "Елегантний дерев'яний стілець у стилі Раковець", 
        image: "URL_ЗОБРАЖЕННЯ_РАКОВЕЦЬ_СТІЛЬЦЯ", 
        price: 750, 
        quantity: 1,
        isSelected: false,
    };

    const handleQuantityChange = (id, newQuantity) => {
        console.log(`Змінено кількість для товару ${id} на ${newQuantity}`);
    };

    const handleRemoveItem = (id) => {
        console.log(`Видалити товар ${id} з кошика`);
    };

    const handleSelectItem = (id, isSelected) => {
        console.log(`Товар ${id} обрано для оплати: ${isSelected}`);
    };

    return (
        <div className="cart-modal-content">
            <h2>Кошик</h2>
                <div className="cart-item">
                    <div className="cart-item-image">
                        <img src={cartItem.image} alt={cartItem.name} />
                    </div>
                    <div className="cart-item-details">
                        <h4 className="cart-item-name">{cartItem.name}</h4>
                        <p className="cart-item-description">{cartItem.description}</p>
                    </div>
                    <div className="cart-item-controls">
                        <span className="cart-item-price">{cartItem.price} грн</span>
                        <div className="cart-item-quantity">
                            <label htmlFor={`quantity-${cartItem.id}`}>Кількість:</label>
                            <button
                                className="quantity-button minus"
                                onClick={() => handleQuantityChange(cartItem.id, Math.max(1, cartItem.quantity - 1))}
                            >-</button>
                            <span id={`quantity-${cartItem.id}`} className="quantity-value">{cartItem.quantity}</span>
                            <button
                                className="quantity-button plus"
                                onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)}
                            >+</button>
                        </div>
                        <button className="cart-item-remove" onClick={() => handleRemoveItem(cartItem.id)}>Видалити</button>
                        <div className="cart-item-select">
                            <input
                                type="checkbox"
                                checked={cartItem.isSelected}
                                onChange={(e) => handleSelectItem(cartItem.id, e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            <div className="cart-summary">
                <h3 className="cart-total">Загальна сума: {cartItem.price * cartItem.quantity} грн</h3>
                <button className="cart-checkout-button">Оплатити</button>
            </div>
        </div>
    );
}

export default Cart;