// imports and exports
import { headerLogo, profile, config } from '../utils/constants.js'
import { enableValidation, handleProfileSectionEvents, handleEditProfile, handleAddCard,
  handleDeleteCard, cardSectionRenderer, handleConfirmDelete, handleChangeAvatar } from '../utils/utils.js'
import { Section } from '../components/Section.js';
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

export { userInfo, cardSection, popupEditProfile, popupAddCard, popupCardZoom, popupConfirmDeleteCard, popupChangeAvatar, api, currentUserID }

let currentUserID;

const userInfo = new UserInfo(config);
profile.addEventListener('click', handleProfileSectionEvents);

const cardSection = new Section(config.cardContainerSelector, cardSectionRenderer);
const popupEditProfile = new PopupWithForm(config.popupEditProfileSelector, handleEditProfile, config);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm(config.popupAddCardSelector, handleAddCard, config);
popupAddCard.setEventListeners();
const popupCardZoom = new PopupWithImage(config.popupCardZoomSelector, config);
popupCardZoom.setEventListeners();
const popupConfirmDeleteCard = new PopupWithConfirmation(config.popupConfirmDeleteCardSelector, handleConfirmDelete, config);
popupConfirmDeleteCard.setEventListeners();
enableValidation(config);
const popupChangeAvatar = new PopupWithForm(config.popupChangeAvatarSelector, handleChangeAvatar, config);
popupChangeAvatar.setEventListeners();

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'aeb2a898-7182-4955-a890-b5a3c389b27c',
    'Content-Type': 'application/json'
  }
});
Promise.all([
api.getProfileData(),
api.getInitialCardsData() ])
.then(([info, initialCards])=>{
  currentUserID = info._id;
  userInfo.initUser(info);
  cardSection.renderItems(initialCards.reverse());
}).catch(err => {
  console.log(err);
});
