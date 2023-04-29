import { useEffect, useState, React } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/Auth";

function App() {
  //
  //States
  //

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSuccessSignUp, setSuccessSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  //
  //  Effects
  //

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    loadCards();
  }, []);

  //
  //functions
  //

function loadProfile() {
  return api
  .getProfile()
  .then((res) => {
    setCurrentUser(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function loadCards() {
  return api
  .getCards()
  .then((res) => {
    setCards(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
}

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  function handleRegistration(data) {
    auth
      .register(data)
      .then((data) => {
        setSuccessSignUp(true);
        handleInfoTooltipPopupOpen();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setSuccessSignUp(false);
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  function handleAuthorization(data) {
    auth
      .authorize(data)
      .then((data) => {
        setLoggedIn(true);
        navigate("/", { replace: true });
        handleCheckToken();
      })
      .catch((err) => {
        setSuccessSignUp(false);
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  const handleCheckToken = () => {
    auth
      .checkToken()
      .then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
        loadProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .updateAvatar(link)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .updateProfile(user)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.filter((elem) => elem._id !== card._id);
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id || i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipPopupOpen() {
    setInfoTooltipOpen(true);
  }

  // function handleConfirmClick() {
  //     setConfirmPopupOpen(true);
  // }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            loggedIn={loggedIn}
            onSingOut={handleSingOut}
            userEmail={userEmail}
          />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegistration={handleRegistration} />}
            />
            <Route
              path="/sign-in"
              element={<Login onAuthorization={handleAuthorization} />}
            />
            <Route
              path={"/"}
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>
          {loggedIn && <Footer />}
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          title="Вы уверены?"
          submitButtonText="Да"
          name=""
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          success={isSuccessSignUp}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
