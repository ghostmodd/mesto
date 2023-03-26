import {
  popupEditProfile, popupAddCard, userInfo, cardSection, popupCardZoom, api, popupConfirmDeleteCard, popupChangeAvatar,
  currentUserID
} from '../pages/index.js'
import {
  profileAvatar, userNameInput, userAboutInput, buttonEditProfile, buttonAddCard,
  formValidators, buttonChangeAvatar, config
} from './constants.js'
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js"
export {
  resetValidation, handleProfileSectionEvents,
  handleCardClick, enableValidation, handleEditProfile,
  handleAddCard, handleConfirmDelete, handleChangeAvatar,
  cardSectionRenderer, handleDeleteCard
}

// FUNCTIONS
/**
 * The function resets validation before oppening popup
*/
function resetValidation(popupElement) {
  const formElement = popupElement.querySelector('.form');
  formValidators[formElement.name].resetValidation();
};

/**
 * The function sets values for 'popup-edit-profile' input fields
*/
function addValuePopupEditProfile() {
  const { userName, userDescription } = userInfo.getUserInfo();
  userNameInput.value = userName;
  userAboutInput.value = userDescription;
};

const handleEditProfile = function (evt, {userName, userDescription}) {
  evt.preventDefault();
  popupEditProfile.changeSubmitButtonText('Сохранение...');
  api.editProfileData(userName, userDescription).then(res => {
    userInfo.setUserInfo(res);
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupEditProfile.changeSubmitButtonText('Сохранить');
    popupEditProfile.closePopup();
  });
}

const handleAddCard = function (evt, newCardInfo) {
  evt.preventDefault();
  popupAddCard.changeSubmitButtonText('Создание...');
  api.addCard(newCardInfo).then(res => {
    cardSection.addItem(res);
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupAddCard.changeSubmitButtonText('Создать');
    popupAddCard.closePopup();
  });
}

const cardSectionRenderer = function (item) {
  const newCard = new Card(item, currentUserID, config.cardTemplateID, handleCardClick, handleDeleteCard, handleLikeCard, config);
  const cardElement = newCard.create();
  return cardElement;
}

const handleDeleteCard = function (deleteCard, cardID) {
  const data = {
    deleteCard: deleteCard,
    cardID: cardID,
  }
  popupConfirmDeleteCard.openPopup(data);
}

const handleConfirmDelete = function(evt, { deleteCard, cardID }) {
  evt.preventDefault();
  popupConfirmDeleteCard.changeSubmitButtonText('Удаление...');
  api.deleteCard(cardID).then(() => {
    deleteCard();
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    popupConfirmDeleteCard.changeSubmitButtonText('Да');
    popupConfirmDeleteCard.closePopup();
  });
}

const handleLikeCard = function (cardID, isLiked, refreshLikesData) {
  if (isLiked) {
    api.likeCard(cardID).then(newData => {
      refreshLikesData(newData);
    }).catch(err => {
      console.log(err);
    });
  } else {
    api.dislikeCard(cardID).then(newData => {
      refreshLikesData(newData);
    }).catch(err => {
      console.log(err);
    });
  }
}

const handleChangeAvatar = function (evt, avatarSrc) {
  evt.preventDefault();
  popupChangeAvatar.changeSubmitButtonText('Сохранение...');
  api.changeAvatar(avatarSrc.avatarImageLink).then(() => {
    userInfo.changeAvatar({ avatar: avatarSrc.avatarImageLink });
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupChangeAvatar.changeSubmitButtonText('Сохранить');
    popupChangeAvatar.closePopup();
  });
}
/**
 * This is a hadnler of all profile events. When a user clicks on a button
 * which is in the profle section, the handler catches the event and execute
 * code
 * Now there are 2 registered events:
 * 1. Button of editing profle
 * 2. Button of adding a new card
 * In the neaest feature it is planned to add a function of changing profile
 * photo
*/
function handleProfileSectionEvents(evt) {
  if (evt.target == buttonEditProfile) {
    popupEditProfile.openPopup();
    addValuePopupEditProfile();
    resetValidation(popupEditProfile.popupElement);
  } else if (evt.target == buttonAddCard) {
    popupAddCard.openPopup();
    resetValidation(popupAddCard.popupElement);
  } else if (evt.target == buttonAddCard) {
    popupAddCard.openPopup();
    resetValidation(popupAddCard.popupElement);
  } else if (evt.target == buttonChangeAvatar || evt.target == profileAvatar) {
    popupChangeAvatar.openPopup();
    resetValidation(popupChangeAvatar.popupElement);
  }
};

/** The function handles clicks in a particular card`s area using progation
 * and delegation.
 * There are 3 actions:
 * 1. Like card;
 * 2. Delete card;
 * 3. Zoom card`s image.
*/
function handleCardClick(imgElement, caption) {
  popupCardZoom.openPopup(imgElement, caption);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
