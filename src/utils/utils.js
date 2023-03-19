import {
  popupEditProfile, popupAddCard, userInfo, cardSection, popupCardZoom
} from '../pages/index.js'
import {
  userNameInput, userAboutInput, buttonEditProfile,  buttonAddCard,
  formValidators
} from './constants.js'
import { FormValidator } from "../components/FormValidator.js"
export { resetValidation, handleProfileSectionEvents,
  handleCardClick, enableValidation, handleEditProfile,
  handleAddCard }

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

const handleEditProfile = function (evt, {userName, aboutUser}) {
  evt.preventDefault();
  userInfo.setUserInfo(userName, aboutUser);
  popupEditProfile.closePopup();
}

const handleAddCard = function (evt, newCardInfo) {
  evt.preventDefault();
  cardSection.addItem(newCardInfo);
  popupAddCard.closePopup();
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
  } else if (evt.target == buttonAddCard) {
    popupAddCard.openPopup();
    resetValidation(popupAddCard._popupElement);
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
// profile.addEventListener('click', handleProfileSectionEvents);


const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
