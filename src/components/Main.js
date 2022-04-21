import React, {useContext} from 'react';
import Card from './Card.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'

const Main = ({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) => {

    const userContext = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button onClick={onEditAvatar} className="profile__edit-image" type="button" aria-label="Изменить аватар">
                        {userContext.avatar && <img className="profile__avatar" src={userContext.avatar} alt="Аватар."/>}
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{userContext.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button button-hover" type="button" aria-label="Редактировать"></button>
                        <h2 className="profile__about">{userContext.about}</h2>
                    </div>
                </div>
                <button onClick={onAddPlace} className="profile__add-button button-hover" type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map(card => <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main;