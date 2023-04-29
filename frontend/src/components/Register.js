import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegistration }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(formValue);
  };

  return (
    <div className="register">
      <h3 className="enter__title">Регистрация</h3>
      <form
        onSubmit={handleSubmit}
        className={"enter__form"}
        name={"enter-form"}
      >
        <input
          id="email"
          name="email"
          type="email"
          className="popup__input popup__input_enter"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email:"
        />

        <input
          id="password"
          name="password"
          type="text"
          className="popup__input popup__input_enter"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="popup__submit popup__submit_button-container"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>

      <div className="register__signin">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
