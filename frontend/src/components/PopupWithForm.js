function PopupWithForm(props) {


    return(
        <div className={`popup` + (props.isOpen ? " popup_opened": '')} id="profile">
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}/>
                <h3 className="popup__title">{props.title}</h3>
                <form className={`form popup__content-${props.name}`} name={`popup__content-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    {/*<span className="form__error job-input-error"></span>*/}
                    <button type="submit" className="popup__submit" onClick={props.onClose}>{props.submitButtonText}</button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm;