import React, { useState } from "react";
import "./auth.css";

function Login({ onClose, switchToRegister, onLoginSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    const { username, password } = form;

    if (!username || !password) {
      return setError("Заповніть всі поля");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Помилка входу");

      localStorage.setItem("token", data.token);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button className="auth-close" onClick={onClose}>✖</button>
      <h2>Авторизація</h2>
      <input name="username" type="text" placeholder="Логін" className="auth-input" onChange={handleChange} value={form.username} />
      <input name="password" type="password" placeholder="Пароль" className="auth-input" onChange={handleChange} value={form.password} />
      {error && <p className="auth-error">{error}</p>}
      <div className="auth-options">
        <label><input type="checkbox" /> Запам'ятати</label>
        <a href="/forgot-password" className="forgot-password">Забули пароль?</a>
      </div>
      <button className="auth-button" onClick={handleLogin}>Увійти</button>
      <p className="switch-auth">
        Або <span className="auth-switch" onClick={switchToRegister}>Зареєструватися</span>
      </p>
    </div>
  );
}

export default Login;