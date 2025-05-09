import React, { useState } from "react";
import Header from "./Header/header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Footer from "./Footer/footer";
import Login from "./Auth/login";
import Register from "./Auth/register";
import "./Auth/auth.css";
import Cart from "./Pages/Cart/cart";
import "./Pages/Cart/cart.css";
import { CartProvider } from "./Pages/Cart/CartContext";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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

  return (
    <CartProvider>
      <BrowserRouter>
        <Header
          openLoginModal={openLoginModalFromHeader}
          openCartModal={openCartModalFromHeader}
        />
        <AppRouter />
        <Footer />

        {isAuthModalOpen && (
          <div className="auth-overlay" onClick={closeAuthModal}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              {authType === "login" && (
                <Login onClose={closeAuthModal} switchToRegister={switchToRegisterModal} />
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
              <Cart />
              <button className="auth-close" onClick={closeCartModal}>✖</button>
            </div>
          </div>
        )}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
