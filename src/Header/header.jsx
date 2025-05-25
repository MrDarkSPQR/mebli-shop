import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

function Header({ openLoginModal, openCartModal, isAuthenticated, handleLogout }) {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>Головна</NavLink></li>
          <li><NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>Товари</NavLink></li>
          <li onClick={openCartModal} style={{ cursor: 'pointer' }}> 
            Кошик
          </li>
        </ul>
        {isAuthenticated ? (
          <button className="login-button" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <button className="login-button" onClick={openLoginModal}>
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;