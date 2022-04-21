import React from 'react';

const ImagePopup = ({card, onClose}) => {
    if (!card) return null;
    return (
        <div className="popup popup_pic-fullscreen popup_opened" id="popup_pic-fullscreen">
            <img className="popup__image" src={card.link} alt={card.name}/>
            <button onClick={onClose} className="popup__button-close button-hover" id="close_pic-fullscreen" type="button" aria-label="Закрыть"></button>
            <h2 className="popup__capture">{card.name}</h2>
            <div onClick={onClose} className="popup__overlay" id="overlay_pic-fullscreen"></div>
        </div>
    );
}

export default ImagePopup;