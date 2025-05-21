import React, { useState } from "react";
import "./auth.css";

function Register({ onClose, switchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    const { username, email, password, confirm } = form;

    if (!username || !email || !password || !confirm) {
      return setError("Будь ласка, заповніть усі поля");
    }

    if (!email.includes("@")) {
      return setError("Невірний формат email");
    }

    if (password.length < 8) {
      return setError("Пароль має містити щонайменше 8 символів");
    }

    if (password !== confirm) {
      return setError("Паролі не співпадають");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Помилка реєстрації");

      setSuccess("Успішно зареєстровано");
      setTimeout(() => {
        switchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button className="auth-close" onClick={onClose}>✖</button>
      <h2>Реєстрація</h2>
      <input name="username" type="text" placeholder="Ім'я користувача" className="auth-input" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" className="auth-input" onChange={handleChange} />
      <input name="password" type="password" placeholder="Пароль" className="auth-input" onChange={handleChange} />
      <input name="confirm" type="password" placeholder="Підтвердити пароль" className="auth-input" onChange={handleChange} />
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <button className="auth-button" onClick={handleSubmit}>Зареєструватися</button>
      <p className="switch-auth">
        Або <span className="auth-switch" onClick={switchToLogin}>Увійти</span>
      </p>
    </div>
  );
}

export default Register;
