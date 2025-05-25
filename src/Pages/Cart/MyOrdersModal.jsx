import React, { useState, useEffect } from 'react';
import './MyOrdersModal.css';

function MyOrdersModal({ onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserId(decodedToken.id);
      } catch (err) {
        setError("Помилка аутентифікації. Будь ласка, увійдіть знову.");
        setLoading(false);
      }
    } else {
      setError("Ви не увійшли в систему. Будь ласка, увійдіть, щоб переглянути замовлення.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          //const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
          const response = await fetch(`https://mebli-shop-backend.onrender.com/api/orders/user/${userId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Не вдалося отримати замовлення');
          }
          setOrders(data);
        } catch (err) {
          setError(err.message || "Не вдалося завантажити замовлення.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="my-orders-modal-content">
      <button className="auth-close" onClick={onClose}>✖</button>
      <h2>Мої замовлення</h2>
      {loading && <p>Завантаження замовлень...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>У вас ще немає замовлень.</p>}
      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-item-card">
              <h3>Замовлення №{order._id.slice(-6)}</h3>
              <p>Дата замовлення: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Загальна сума: {order.totalAmount} грн</p>
              <h4>Товари:</h4>
              <ul className="order-items-list">
                {order.orderItems.map(item => (
                  <li key={item.productId}>
                    {item.name} ({item.quantity} шт.) - {item.price * item.quantity} грн
                  </li>
                ))}
              </ul>
              <div className="customer-info-toggle">
                <details>
                  <summary>Деталі доставки та оплати</summary>
                  <p>ПІБ: {order.customerInfo.fullName}</p>
                  <p>Телефон: {order.customerInfo.phone}</p>
                  <p>Email: {order.customerInfo.email}</p>
                  <p>Місто: {order.customerInfo.city}</p>
                  <p>Адреса: {order.customerInfo.addressLine}</p>
                  <p>Поштовий індекс: {order.customerInfo.postalCode}</p>
                  <p>Спосіб оплати: {order.paymentMethod === 'card' ? 'Картка' : 'Готівка'}</p>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersModal;