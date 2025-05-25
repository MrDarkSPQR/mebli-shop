import React, { useState, useEffect } from 'react';
import './PaymentModal.css';

function PaymentModal({ onClose, onOrderSuccess, selectedCartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    addressLine: '',
    postalCode: '',
    cardNumber: '',
    cvv: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Помилка декодування токена:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    const { fullName, phone, email, city, addressLine, postalCode, cardNumber, cvv } = formData;
    if (!fullName || !phone || !email || !city || !addressLine || !postalCode) {
      alert('Будь ласка, заповніть усі обов\'язкові поля доставки.');
      return false;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cvv)) {
      alert('Будь ласка, заповніть усі дані картки.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        userId: userId,
        customerInfo: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          addressLine: formData.addressLine,
          postalCode: formData.postalCode,
        },
        paymentMethod: paymentMethod,
        cardInfo: paymentMethod === 'card' ? { cardNumber: formData.cardNumber, cvv: formData.cvv } : null,
        orderItems: selectedCartItems.map(item => ({
            productId: item._id, // Відправляємо _id товару як productId
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
        totalAmount: totalAmount,
      };

      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Помилка при оформленні замовлення.');
        }

        alert('Замовлення успішно оформлено!');
        onOrderSuccess();
      } catch (error) {
        console.error("Помилка відправки замовлення:", error);
        alert(`Помилка при оформленні замовлення: ${error.message}`);
      }
    }
  };

  return (
    <div className="payment-modal-content">
      <button className="auth-close" onClick={onClose}>✖</button>
      <h2>Оформлення замовлення</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ПІБ:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ім'я та Прізвище"
          />
        </div>
        <div className="form-group">
          <label>Номер телефону:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380XXXXXXXXX"
          />
        </div>
        <div className="form-group">
          <label>Електронна адреса:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>
        <div className="form-group">
          <label>Назва населеного пункту:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Місто"
          />
        </div>
        <div className="form-group">
          <label>Вулиця, будинок, квартира:</label>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            placeholder="Вулиця, буд., кв."
          />
        </div>
        <div className="form-group">
          <label>Поштовий індекс:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Індекс"
            maxLength="5"
          />
        </div>

        <div className="payment-method-selection">
          <label>Спосіб оплати:</label>
          <div className="payment-radio-group">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={handlePaymentMethodChange}
              />
              Готівка
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              Картка
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="card-details">
            <div className="form-group">
              <label>Номер картки:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="16"
              />
            </div>
            <div className="form-group">
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="XXX"
                maxLength="3"
              />
            </div>
          </div>
        )}

        <button type="submit" className="payment-submit-button">Оплатити {totalAmount} грн</button>
      </form>
    </div>
  );
}

export default PaymentModal;