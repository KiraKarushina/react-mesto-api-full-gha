import React, { useState } from "react";

const Login = ({ onAuthorization }) => {
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
    onAuthorization(formValue);
  };

  return (
    <div className="login">
      <h3 className="enter__title">Вход</h3>
      <form
        onSubmit={handleSubmit}
        className={"enter__form"}
        name={"enter-form"}
      >
        <input
          required
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
            className={"popup__submit popup__submit_button-container"}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
