// DATA and GENERAL SELECTORS
// profile varies
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.form__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.form__input_type_about-user');

// card elements or data source for initialization
const cardsContainer = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://i.ibb.co/5YBsnbF/kira-porotikova-4d-PT83cs-Tic-unsplash.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

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
 * The function shows popup element by changing some CSS properties [visibility and opacity]
 * @param {string} popupElement necessary argument which should reffer to popup element which
 * is supposed to be opened
*/
function openPopup(popupElement) {
  const buttonClosePopup = popupElement.querySelector('.button_type_close-popup');
  buttonClosePopup.addEventListener('click', closePopup);

  popupElement.style.visibility = 'visible';
  popupElement.style.opacity = '1';
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
  popupElement.style.opacity = '0';
  // setTimeout is used to wait for the transition to complete
  setTimeout(() => { popupElement.style.visibility = 'hidden' }, 100);
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

/**
 * @constructor
 * The function adds card to the page by clonning templates and adds eventListeners to
 * particular elements.
 * @param {object} elem necessary argument which should reffer to the data source (f. i., variable
 * or database)
*/
function renderCard(elem) {
  // selection of elements
  const cardTemplate = document.querySelector('#card').content.querySelector('.card').cloneNode(true);
  const cardTitle = cardTemplate.querySelector('.card__title');
  const cardImage = cardTemplate.querySelector('.card__image');
  const buttonDeleteCard = cardTemplate.querySelector('.card__btn-delete-card');
  const buttonLikeCard = cardTemplate.querySelector('.card__btn-like-card');

  // pasting data
  cardImage.src = elem.link;
  cardImage.alt = `Фотография места "${elem.name}"`;
  cardTitle.textContent = elem.name;
  cardsContainer.prepend(cardTemplate);

  // adding eventListeners
  cardImage.addEventListener('click', () => {
    imageCardZoom.src = cardImage.src;
    imageCardZoom.alt = cardImage.alt;
    captionCardZoom.textContent = cardTitle.textContent;
    openPopup(popupCardZoom);
  });
  buttonDeleteCard.addEventListener('click', evt => { evt.target.closest('.card').remove() });
  buttonLikeCard.addEventListener('click', evt => { evt.target.classList.toggle('card__btn-like-card_activated')
  });
};

/**
 * The function initializes cards from data source. It uses forEach to paste cards with information
 * which is contained in the data source
 * @param {object} data necessary argument which should reffer to the data source (f. i., variable
 * or database)
 * @see {@link renderCard} this function pastes cards to the page
*/
function initCards(data) {
  data.forEach(elem => { renderCard(elem) });
};

/**
 * The function adds new cards to the page
 * @param {object} data necessary argument which should reffer to the data source (f. i., variable
 * or database)
*/
function addCard(data) {
  data.push({
    name: cardTitleInput.value,
    link: cardImageLinkInput.value,
  });
  renderCard(data[data.length - 1]);
}

/**
 * The function adds main eventListeners to the page's elements. There are such elements:
 * 1. button for profile editing;
 * 2. button for submitting new profile data;
 * 3. button for adding a new card;
 * 4. button for saving data of a new card
 *
 * Other event listeners are in related functions since they aren't supposed to be connected
 * with the main page.
*/
function turnOnEventListeners () {
  buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    addValuePopup();
  });
  formEditProfile.addEventListener('submit', evt => {
    submitPopup(evt);
    saveProfileData();
  });
  buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    nullifyFormValue(popupAddCard);
  });
  formAddCard.addEventListener('submit', evt => {
    submitPopup(evt);
    addCard(initialCards);
  });
}


// GENERAL CALL FUNCTION
initCards(initialCards);
turnOnEventListeners();
