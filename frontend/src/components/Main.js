import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__images" onClick={onEditAvatar}>
          <img
            className="profile__image"
            id="profileImageId"
            alt=""
            src={currentUser.avatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__info-edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>

        <button
          id="addCardButton"
          type="button"
          className="profile__add"
          onClick={onAddPlace}
        />
      </section>

      <section id="cards" className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
