import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function Header({ loggedIn, onSingOut, userEmail }) {
  // Для проверки текущего url
  const location = useLocation();

  function handleSignOut() {
    onSingOut();
  }

  return (
    <>
      <header className="header">
        <img src={logo} className="header__logo" alt="лого" />
        {loggedIn && (
          <>
            <div className="header__login">
              <p className="header__email">{userEmail}</p>
              <a className="header__button" onClick={handleSignOut}>
                Выйти
              </a>
            </div>
          </>
        )}

        {!loggedIn && (
          <>
            {location.pathname === "/sign-in" && (
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            )}
            {location.pathname === "/sign-up" && (
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            )}
          </>
        )}
      </header>
    </>
  );
}

export default Header;
