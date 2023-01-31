// DATA and GENERAL SELECTORS
// profile varies
const profile = document.querySelector('.profile');
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.form__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.form__input_type_about-user');

// cards
const cards = document.querySelector('.cards');

// selectors for popup-edit-profile
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.form_edit-profile');
const buttonEditProfile = document.querySelector('.profile__btn-edit-profile');

// selectors for popup-add-card
const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = document.querySelector('.form_add-card');
const buttonAddCard = document.querySelector('.profile__btn-add-card');
const cardTitleInput = formAddCard.querySelector('.form__input_type_card-title');
const cardImageLinkInput = formAddCard.querySelector('.form__input_type_image-link');

// selectors for popup-card-zoom
const popupCardZoom = document.querySelector('.popup_card-zoom');
const imageCardZoom = document.querySelector('.card-zoom__image');
const captionCardZoom = document.querySelector('.card-zoom__caption');



// FUNCTIONS
/**
 * The function sets values for 'popup-edit-profile' input fields
*/
function addValuePopup() {
  userNameInput.value = `${userName.textContent}`;
  userAboutInput.value = `${userAbout.textContent}`;
};

/**
 * This is a hadnler function which deals with the hotkey of closing
 * popup.
 * @see {@link openPopup} The event is expressed when a popup is opened
 * @see {@link closePopup} It removes when a popup is closed
*/
function escapeHandler(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(evt, openedPopup)
  };
};

/**
 * This is a hadnler function which provides closing of popup by click
 * on overlay
 * @see {@link openPopup} The event is expressed when a popup is opened
 * @see {@link closePopup} It removes when a popup is closed
*/
function overlayHandler (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target == openedPopup) {
    closePopup(evt, openedPopup);
  }
};

/**
 * This is a hadnler for all profile events. When a user clicks on a button
 * which is in the profle section, the handler catches the event and execute
 * code
 * Now there are 2 registered events:
 * 1. Button of editing profle
 * 2. Button of adding a new card
 * In the neaest feature it is planned to add a function of changing profile
 * photo
*/
function profileHandler (evt) {
  if (evt.target == buttonEditProfile) {
    openPopup(popupEditProfile);
  } else if (evt.target == buttonAddCard) {
    openPopup(popupAddCard);
    nullifyFormValue(popupAddCard);
  }
}

/**
 * The function shows popup element by changing some CSS properties [visibility and opacity]
 * @param {string} popupElement necessary argument which should reffer to popup element which
 * is supposed to be opened
*/
function openPopup(popupElement) {
  const buttonClosePopup = popupElement.querySelector('.button_type_close-popup');
  buttonClosePopup.addEventListener('click', closePopup);

  document.addEventListener('keydown', escapeHandler);
  popupElement.addEventListener('click', overlayHandler);
  popupElement.classList.add('popup_opened');
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
  document.removeEventListener('keydown', escapeHandler);
}

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
 * The function saves profile data copying string values from the popup's input fields
 * to text blocks.
*/
function saveProfileData() {
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
};

/**
 * The function nullifies values of some popup's input fields
 * @param {string} popupElement necessary argument which should reffer to popup element whose
 * values are supposed to be nullified.
*/
function nullifyFormValue(popupElement) {
  const formElement = popupElement.querySelectorAll('.form__input');
  formElement.forEach((item) => { item.value = '' });
};

function cardsHandler (evt) {
  if (evt.target.classList.contains('card__btn-like-card')) {
    evt.target.classList.toggle('card__btn-like-card_activated')
  } else if (evt.target.classList.contains('card__btn-delete-card')) {
    evt.target.closest('.card').remove();
  } else if (evt.target.classList.contains('card__image')) {
    const cardTitle = evt.target.closest('.card').querySelector('.card__title');
    imageCardZoom.src = evt.target.src;
    imageCardZoom.alt = evt.target.alt;
    captionCardZoom.textContent = cardTitle.textContent;
    openPopup(popupCardZoom);
  }
};
/**
 * @constructor
 * The function adds card to the page by clonning templates.
 * @param {object} elem necessary argument which should reffer to the data source (f. i., variable
 * or database)
*/
function createCard(elem) {
  // selection of elements
  const cardTemplate = document.querySelector('#card').content.querySelector('.card').cloneNode(true);
  const cardTitle = cardTemplate.querySelector('.card__title');
  const cardImage = cardTemplate.querySelector('.card__image');

  // pasting data
  cardImage.src = elem.link;
  cardImage.alt = `Фотография места "${elem.name}"`;
  cardTitle.textContent = elem.name;

  return cardTemplate;
};

function renderCard(card = createCard(initialCards)) {
  cardsContainer.prepend(card);
}

/**
 * The function initializes cards from data source. It uses forEach to paste cards with information
 * which is contained in the data source
 * @param {object} data necessary argument which should reffer to the data source (f. i., variable
 * or database)
 * @see {@link renderCard} this function pastes cards to the page
*/
function initCards(data) {
  data.forEach(elem => {
    renderCard(createCard(elem));
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
  profile.addEventListener('click', profileHandler);
  formEditProfile.addEventListener('submit', evt => {
    submitPopup(evt);
    saveProfileData();
  });
  formAddCard.addEventListener('submit', evt => {
    submitPopup(evt);
    const newCard = {
      name: cardTitleInput.value,
      link: cardImageLinkInput.value,
    }
    renderCard(createCard(newCard));
  });
  cards.addEventListener('click', cardsHandler);
}

// GENERAL CALL FUNCTION
addValuePopup()
enableValidation();
initCards(initialCards);
enableEventListeners();
