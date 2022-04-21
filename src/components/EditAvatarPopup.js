import React, {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="edit-avatar" title="Обновить аватар">
              <input ref={avatarRef} className="popup__input" id="input_link-avatar" type="url" name="link" placeholder="Ссылка на новый аватар" required/>
              <span className="popup__error" id="input_link-avatar-error"></span>
              <button className="popup__button" id="save-avatar-button" type="submit">Сохранить</button>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
