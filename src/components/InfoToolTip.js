import React from 'react';
import imgSuccess from '../images/success.svg';
import imgFail from '../images/fail.svg';

const InfoToolTip = ( {isOpen, onClose, status} ) => {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <img className='popup__status-img' alt='Статус регистрации' src={ status ? imgSuccess : imgFail } />
                <h2 className="popup__status-text">
                    { status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }
                </h2>
            </div>
            <button className="popup__button-close button-hover" type="button" aria-label="Закрыть" onClick={onClose}></button>
            <div className="popup__overlay" onClick={onClose}></div>
        </div>
    );
}

export default InfoToolTip;
