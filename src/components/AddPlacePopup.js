import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    const handleChangePlace = (e) => {
        setPlace(e.target.value);
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: place,
            link
        });
    }

    useEffect(() => {
        setPlace('');
        setLink('');
    }, [isOpen]); 

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="add-card" title="Новое место">
              <input value={place} onChange={handleChangePlace} className="popup__input" id="input_mesto" type="text" name="name" placeholder="Название" required minLength="2" maxLength="200"/>
              <span className="popup__error" id="input_mesto-error"></span>
              <input value={link} onChange={handleChangeLink} className="popup__input" id="input_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
              <span className="popup__error" id="input_link-error"></span>
              <button className="popup__button" id="create-button" type="submit">Создать</button>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
