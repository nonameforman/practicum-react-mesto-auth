import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const EditprofilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userContext = useContext(CurrentUserContext);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(userContext.name);
        setDescription(userContext.about);
    }, [userContext, isOpen]); 

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="edit-profile" title="Редактировать профиль">
              <input value={name || ''} onChange={handleChangeName} className="popup__input" id="input_name" type="text" name="name" placeholder="Ваше имя" required minLength="2" maxLength="40"/>
              <span className="popup__error" id="input_name-error"></span>
              <input value={description || ''} onChange={handleChangeDescription} className="popup__input" id="input_about" type="text" name="about" placeholder="Расскажите о себе" required minLength="2" maxLength="200"/>
              <span className="popup__error" id="input_about-error"></span>
              <button className="popup__button" id="save-button" type="submit">Сохранить</button>
          </PopupWithForm>
    );
}

export default EditprofilePopup;
