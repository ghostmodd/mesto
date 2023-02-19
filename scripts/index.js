// imports and exports
import { profile, userName, userNameInput, userAbout, userAboutInput, cards, popupList,
  popupEditProfile, formEditProfile, buttonEditProfile, popupAddCard, formAddCard, buttonAddCard,
  cardTitleInput, cardImageLinkInput, config } from './constants.js'
import { FormValidator } from "./FormValidator.js"
import { Card } from "./Card.js"


// FUNCTIONS
/**
 * The function sets values for 'popup-edit-profile' input fields
*/
function addValuePopupEditProfile() {
  userNameInput.value = `${userName.textContent}`;
  userAboutInput.value = `${userAbout.textContent}`;
};

/**
 * The function nullifies values of some popup's input fields
 * @param {string} popupElement necessary argument which should reffer to popup element whose
 * values are supposed to be nullified.
*/
function nullifyFormValue(formElement) {
  formElement.reset();
};

/**
 * The function saves profile data copying string values from the popup's input fields
 * to text blocks.
*/
function saveProfileData() {
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
};

/**
 * The function shows popup element by changing some CSS properties [visibility and opacity]
 * @param {string} popupElement necessary argument which should reffer to popup element which
 * is supposed to be opened
*/
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupKeyboardEvents);
};

/**
 * The function hides popup element. It works inversely in relation to {openPopup}.
 * This function makes changes to styles [visibility and opacity] of popup element
 * which is supposed to be closed
 * @param {string} evt necessary argument obtained from callback function
 * @param {string} popupElement unnecessary argument which should reffer to popup
 * element which is supposed to be closed. If the argument isn't provided, the fucntion
 * gets the closest parent element
*/
function closePopup(evt, popupElement = evt.target.closest('.popup')) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKeyboardEvents);
};

/**
 * The function submits forms. It executed 2 actions:
 * 1. prevents page from standart actions such as refreshing the current page
 * 2. closes popup and form
 * @param {string} evt necessary argument obtained from callback function
 * @see {@link closePopup} this function is used to close a popup
*/
function submitPopup(evt) {
  evt.preventDefault();
  closePopup(evt);
};

/**
 * This is a hadnler function which deals with the hotkey of popup
 * @see {@link openPopup} The event is expressed when a popup is opened
 * @see {@link closePopup} It removes when a popup is closed
*/
function handlePopupKeyboardEvents(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(evt, openedPopup)
  };
};

/**
 * This is a handler of popup`s mouse events
*/
function handlePopupMouseEvents (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt, evt.target);
  } else if (evt.target.classList.contains('button_type_close-popup')) {
    closePopup(evt);
  }
};

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
function handleProfileSectionEvents (evt) {
  if (evt.target == buttonEditProfile) {
    addValuePopupEditProfile();
    openPopup(popupEditProfile);
  } else if (evt.target == buttonAddCard) {
    openPopup(popupAddCard);
  }
};

/**
 * The function initializes cards from data source. It uses forEach to paste cards with information
 * which is contained in the data source
 * @param {object} data necessary argument which should reffer to the data source (f. i., variable
 * or database)
 * @see {@link renderCard} this function pastes cards to the page
*/
function initCards(data) {
  data.forEach(elem => {
    const newCard = new Card(elem.name, elem.link, config.cardTemplateID, config);
    newCard.render();
  });
};

/**
 * The function adds main eventListeners to the page's elements. There are such elements:
 * 1. buttons which are situated in 'profile' section: open edit profile form and open form of adding
 * a new card;
 * 2. button for submitting new profile data;
 * 3. button for saving data of a new card;
 * 4. buttons which are in 'cards' section: delete, like and open zoomed image popup.
 *
 * Other event listeners are in related functions since they aren't supposed to be connected
 * with the main page.
*/
function enableEventListeners() {
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', handlePopupMouseEvents);
  });
  profile.addEventListener('click', handleProfileSectionEvents);
  formEditProfile.addEventListener('submit', evt => {
    submitPopup(evt);
    saveProfileData();
  });
  formAddCard.addEventListener('submit', evt => {
    submitPopup(evt);
    const newCard = new Card(cardTitleInput.value, cardImageLinkInput.value, config.cardTemplateID, config);
    newCard.render();
    nullifyFormValue(evt.target);
  });
};

// GENERAL CALL FUNCTION
Array.from(document.querySelectorAll('.form')).forEach(formElement => {
  const formValidation = new FormValidator(formElement, config);
  formValidation.enableValidation();
});
initCards(initialCards);
enableEventListeners();
