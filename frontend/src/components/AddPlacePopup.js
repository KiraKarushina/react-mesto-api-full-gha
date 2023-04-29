import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ onAddPlace, onClose, isOpen }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Новое место"
      submitButtonText="Создать"
      name="card"
    >
      <input
        id="addCardInputName"
        name="name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_author"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__error addCardInputName-error" />
      <input
        id="addCardInputLink"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_job"
        type="url"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="form__error addCardInputLink-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
