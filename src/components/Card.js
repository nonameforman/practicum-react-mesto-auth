import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    const userContext = useContext(CurrentUserContext);

    const isOwn = card.owner._id === userContext._id;
    const isLiked = card.likes.some(i => i._id === userContext._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? '' : 'element__delete-button_disabled'}`
    );

    const cardLikeButtonClassName = (
        `element__button ${isLiked ? 'element__button_active' : ''}`
    );

    return (
        <li className="element">
            <button onClick={handleClick} className="element__pic-button" type="button" aria-label="Открыть изображение"><img className="element__pic" src={card.link} alt={card.name}/></button>
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="Удалить"></button>
            <div className="element__describtion">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-place">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Нравится"></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;