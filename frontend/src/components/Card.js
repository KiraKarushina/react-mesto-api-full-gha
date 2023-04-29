import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id || i === currentUser._id);

  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">
      {isOwn && (
        <button className="elements__delete" onClick={handleDeleteClick} />
      )}
      <img
        onClick={handleCardClick}
        className="elements__card-image"
        src={card.link}
        alt={card.name}
      />
      <div className="elements__group">
        <h2 className="elements__card-text">{card.name}</h2>
        <div className="elements__block">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          />
          <span className="elements__score">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
