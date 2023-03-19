import { Card } from "../components/Card.js"
import { handleCardClick } from "./utils.js";
export { profile, userNameInput, userAboutInput,
  buttonEditProfile, buttonAddCard, formValidators,
  initialCards, userInfoElements, config
}

// DATA and GENERAL SELECTORS
// profile varies
const profile = document.querySelector('.profile');
const userNameInput = document.querySelector('.form__input_type_user-name');
const userAboutInput = document.querySelector('.form__input_type_about-user');

// buttons
const buttonEditProfile = document.querySelector('.profile__btn-edit-profile');
const buttonAddCard = document.querySelector('.profile__btn-add-card');

// form validation object
const formValidators = {}

// configuration
const config = {
  // profile
  userNameSelector: '.profile__user-name',
  userDescriptionSelector: '.profile__about-user',

  // card
  cardContainerSelector: '.cards',
  cardTemplateID: '#card',
  cardSelector: '.card',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',
  cardImage: 'card__image',
  cardBtnLikeCard: 'card__btn-like-card',
  cardBtnLikeCardActiveted: 'card__btn-like-card_activated',
  cardBtnDeleteCardSelector: '.card__btn-delete-card',
  cardBtnDeleteCard: 'card__btn-delete-card',

  // popup
  popupOpenedClass: 'popup_opened',
  popupEditProfileSelector: '.popup_edit-profile',
  popupAddCardSelector: '.popup_add-card',
  popupCardZoomSelector: '.popup_card-zoom',
  buttonClosePopupSelector: '.button_type_close-popup',

  // form validation
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
  disableButtonClass: 'form__btn-submit_disabled',
};

const initialCards = {
  items: [
    {
      cardTitle: 'Архыз',
      cardImageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      cardTitle: 'Челябинская область',
      cardImageLink: 'https://i.ibb.co/5YBsnbF/kira-porotikova-4d-PT83cs-Tic-unsplash.jpg',
    },
    {
      cardTitle: 'Иваново',
      cardImageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      cardTitle: 'Камчатка',
      cardImageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      cardTitle: 'Холмогорский район',
      cardImageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      cardTitle: 'Байкал',
      cardImageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
  ],
  renderer (item, container) {
    const newCard = new Card(item, config.cardTemplateID, handleCardClick, config);
    const cardElement = newCard.create();
    container.prepend(cardElement);
  },
}

// images
const headerLogo = new URL('../images/header__logo.svg', import.meta.url);
const profileAvatar = new URL('../images/profile__avatar.jpg', import.meta.url);

const userInfoElements = {
  userName: config.userNameSelector,
  userDescription: config.userDescriptionSelector,
}
