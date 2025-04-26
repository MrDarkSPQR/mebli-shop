import React from "react";
import "./auth.css";

function Register({ onClose, switchToLogin }) {
    return (
        <div>
            <button className="auth-close" onClick={onClose}>✖</button>
            <h2>Реєстрація</h2>
            <input type="text" placeholder="Ім'я користувача" className="auth-input" />
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Пароль" className="auth-input" />
            <input type="password" placeholder="Підтвердити пароль" className="auth-input" />
            <button className="auth-button">Зареєструватися</button>
            <p className="switch-auth">
                Або <span className="auth-switch" onClick={switchToLogin}>Увійти</span>
            </p>
        </div>
    );
}

export default Register;
