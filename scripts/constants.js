export { profile, userName, userNameInput, userAbout, userAboutInput, cardsContainer, popupList,
  popupEditProfile, formEditProfile, buttonEditProfile, popupAddCard, formAddCard, buttonAddCard,
  cardTitleInput, cardImageLinkInput, popupCardZoom, imageCardZoom, captionCardZoom, config
}

// DATA and GENERAL SELECTORS
// profile varies
const profile = document.querySelector('.profile');
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.form__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.form__input_type_about-user');

// cards
const cardsContainer = document.querySelector('.cards');

const popupList = document.querySelectorAll('.popup');
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

const config = {
  // card
  cardTemplateID: '#card',
  cardSelector: '.card',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',
  cardImage: 'card__image',
  cardBtnLikeCard: 'card__btn-like-card',
  cardBtnLikeCardActiveted: 'card__btn-like-card_activated',
  cardBtnDeleteCardSelector: '.card__btn-delete-card',
  cardBtnDeleteCard: 'card__btn-delete-card',

  // form validation
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
  disableButtonClass: 'form__btn-submit_disabled',
};
