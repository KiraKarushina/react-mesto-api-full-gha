import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      name="profile"
    >
      <input
        id="author-input"
        type="text"
        name="_name"
        className="popup__input popup__input_type_author"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="form__error author-input-error" />
      <input
        id="job-input"
        type="text"
        name="_job"
        className="popup__input popup__input_type_job"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="form__error job-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
