function ImagePopup(props) {
  return (
    <div
      className={
        `popup popup_theme_dark` + (props.isOpen ? " popup_opened" : "")
      }
      id="previewPopup"
    >
      <div className="popup__preview-container">
        <button
          onClick={props.onClose}
          id="popupPictureClose"
          type="button"
          className="popup__close"
        />
        <img
          id="previewImage"
          className="popup__preview-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h3 id="previewDescription" className="popup__preview-title">
          {props.card.name}
        </h3>
      </div>
    </div>
  );
}

export default ImagePopup;
