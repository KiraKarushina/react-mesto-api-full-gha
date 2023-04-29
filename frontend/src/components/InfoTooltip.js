import successImg from "../images/success.png";
import failImg from "../images/fail.png";

const InfoTooltip = (props) => {
  const handleCloseInfoTooltip = () => {
    props.onClose();
  };
  return (
    <div
      className={`popup` + (props.isOpen ? " popup_opened" : "")}
      id="infoTooltipPopup"
    >
      <div className="popup__container popup__container_result">
        <button
          onClick={handleCloseInfoTooltip}
          id="infoTooltipPopupClose"
          type="button"
          className="popup__close"
        />
        <img
          id="previewImage"
          className="popup__result-image"
          src={props.success ? successImg : failImg}
          alt={props.success ? "Успех" : "Неудача"}
        />
        <h3 className="popup__title">
          {props.success
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Пропробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
};

export default InfoTooltip;
