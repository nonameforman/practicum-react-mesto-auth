import React, {useState, useEffect} from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    api.getUserInfo()
        .then((res) => {
          setCurrentUser({...res})
        })
        .catch((err) => {
            console.log(`Ошибка при получении данных профиля ${err}`)
        })
  },[]);

  useEffect(() => {
    api.getCards()
        .then(res => setCards(res))
        .catch((err) => {
            console.log(`Ошибка при получении карточек с сервера ${err}`)
        })
  },[]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (userInfo) => {
    api.editProfile(userInfo)
    .then((newValue) => {
      console.log(newValue)
      setCurrentUser(newValue);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при редактировании профиля ${err}`)
    })
  }

  const handleUpdateAvatar = (userAvatar) => {
    api.editAvatar(userAvatar.avatar)
    .then((newValue) => {
      setCurrentUser(newValue);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара ${err}`)
    })
  }

  const handleAddPlaceSubmit = (card) => {
    api.postCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки ${err}`)
    })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    !isLiked
    ? api.putLikeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка при лайке карточки ${err}`)
      })
    : api.deleteLikeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка при лайке карточки ${err}`)
      })
  }

  const handleCardDelete = (card) => {
    api.removeCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки ${err}`)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <PopupWithForm name="confirm-delition" title="Вы уверены?"> {/*подтверждение удаления*/}
              <button className="popup__button" id="delete-button" type="submit">Да</button>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  ); 
}

export default App;