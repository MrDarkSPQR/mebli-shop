import React from "react";
import "./auth.css";

function Login({ onClose, switchToRegister }) {
    return (
        <div>
            <button className="auth-close" onClick={onClose}>✖</button>
            <h2>Авторизація</h2>
            <input type="text" placeholder="Логін" className="auth-input" />
            <input type="password" placeholder="Пароль" className="auth-input" />
            <div className="auth-options">
                <label>
                    <input type="checkbox" /> Запам'ятати
                </label>
                <a href="/forgot-password" className="forgot-password">Забули пароль?</a>
            </div>
            <button className="auth-button">Увійти</button>
            <p className="switch-auth">
                Або <span className="auth-switch" onClick={switchToRegister}>Зареєструватися</span>
            </p>
        </div>
    );
}

export default Login;
