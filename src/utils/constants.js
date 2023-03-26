export {
  profile, userNameInput, userAboutInput,
  buttonEditProfile, buttonAddCard, formValidators,
  buttonChangeAvatar, profileAvatar, config
}

// DATA and GENERAL SELECTORS
// profile varies
const profile = document.querySelector('.profile');
const profileAvatar = document.querySelector('.profile__avatar-background');
const buttonChangeAvatar = document.querySelector('.profile__btn-change-avatar');
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
  userAvatarSelector: '.profile__avatar',

  // card
  cardContainerSelector: '.cards',
  cardTemplateID: '#card',
  cardSelector: '.card',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',
  cardImage: 'card__image',
  cardBtnLikeCardSelector: '.card__btn-like-card',
  cardBtnLikeCard: 'card__btn-like-card',
  cardNumberOfLikesSelector: '.card__number-of-likes',
  cardBtnLikeCardActiveted: 'card__btn-like-card_activated',
  cardBtnDeleteCardSelector: '.card__btn-delete-card',
  cardBtnDeleteCard: 'card__btn-delete-card',
  cardBtnDeleteCardVisible: 'card__btn-delete-card_visible',

  // popup
  popupOpenedClass: 'popup_opened',
  popupEditProfileSelector: '.popup_edit-profile',
  popupAddCardSelector: '.popup_add-card',
  popupCardZoomSelector: '.popup_card-zoom',
  popupConfirmDeleteCardSelector: '.popup_confirm-delete-card',
  popupChangeAvatarSelector: '.popup_change-avatar',
  buttonClosePopupSelector: '.button_type_close-popup',

  // form validation
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
  disableButtonClass: 'form__btn-submit_disabled',
};

// images
const headerLogo = new URL('../images/header__logo.svg', import.meta.url);
