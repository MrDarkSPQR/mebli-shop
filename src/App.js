import React, { useState, useEffect } from "react";
import Header from "./Header/header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Footer from "./Footer/footer";
import Login from "./Auth/login";
import Register from "./Auth/register";
import "./Auth/auth.css";
import Cart from "./Pages/Cart/cart";
import "./Pages/Cart/cart.css";
import PaymentModal from "./Pages/Cart/PaymentModal";
import './Pages/Cart/PaymentModal.css';
import { CartProvider } from "./Pages/Cart/CartContext";
import MyOrdersModal from "./Pages/Cart/MyOrdersModal";
import './Pages/Cart/MyOrdersModal.css';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isMyOrdersModalOpen, setIsMyOrdersModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItemsForPayment, setSelectedItemsForPayment] = useState([]);
  const [totalAmountForPayment, setTotalAmountForPayment] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const openLoginModalFromHeader = () => {
    setAuthType("login");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthType(null);
  };

  const switchToRegisterModal = () => {
    setAuthType("register");
  };

  const switchToLoginModal = () => {
    setAuthType("login");
  };

  const openCartModalFromHeader = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const openPaymentModal = (selectedItems, total) => {
    setSelectedItemsForPayment(selectedItems);
    setTotalAmountForPayment(total);
    setIsPaymentModalOpen(true);
    setIsCartModalOpen(false);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedItemsForPayment([]);
    setTotalAmountForPayment(0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    closeAuthModal();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Ви дійсно бажаєте вийти?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  const openMyOrdersModal = () => {
    setIsMyOrdersModalOpen(true);
    setIsCartModalOpen(false);
  };

  const closeMyOrdersModal = () => {
    setIsMyOrdersModalOpen(false);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Header
          openLoginModal={openLoginModalFromHeader}
          openCartModal={openCartModalFromHeader}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        <AppRouter />
        <Footer />

        {isAuthModalOpen && (
          <div className="auth-overlay" onClick={closeAuthModal}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              {authType === "login" && (
                <Login
                  onClose={closeAuthModal}
                  switchToRegister={switchToRegisterModal}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
              {authType === "register" && (
                <Register onClose={closeAuthModal} switchToLogin={switchToLoginModal} />
              )}
            </div>
          </div>
        )}

        {isCartModalOpen && (
          <div className="auth-overlay" onClick={closeCartModal}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              <Cart
                onClose={closeCartModal}
                openPaymentModal={openPaymentModal}
                openMyOrdersModal={openMyOrdersModal}
              />
            </div>
          </div>
        )}

        {isPaymentModalOpen && (
          <div className="auth-overlay" onClick={closePaymentModal}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              <PaymentModal
                onClose={closePaymentModal}
                selectedCartItems={selectedItemsForPayment}
                totalAmount={totalAmountForPayment}
                onOrderSuccess={() => {
                  closePaymentModal();
                }}
              />
            </div>
          </div>
        )}

        {isMyOrdersModalOpen && (
          <div className="auth-overlay" onClick={closeMyOrdersModal}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              <MyOrdersModal onClose={closeMyOrdersModal} />
            </div>
          </div>
        )}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;