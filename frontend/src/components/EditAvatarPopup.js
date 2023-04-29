import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup ({onClose, isOpen, onUpdateAvatar}) {

    const inputAvatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(inputAvatar.current.value);
    }

    return(
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            title="Обновить аватар"
            submitButtonText="Сохранить"
            name="avatar"
        >
            <input
                ref={inputAvatar}
                id="avatar-input"
                type="url"
                name="link"
                className="popup__input popup__input_type_avatar"
                minLength="2"
                maxLength="200"
                required
            />
            <span className="form__error avatar-input-error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;