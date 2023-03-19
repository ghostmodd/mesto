// imports and exports
import { headerLogo, profilaAvatar, profile, userInfoElements, initialCards, config } from '../utils/constants.js'
import { enableValidation, handleProfileSectionEvents, handleEditProfile, handleAddCard } from '../utils/utils.js'
import { Section } from '../components/Section.js';
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';

export { userInfo, cardSection, popupEditProfile, popupAddCard, popupCardZoom}


profile.addEventListener('click', handleProfileSectionEvents);

const userInfo = new UserInfo(userInfoElements);
const cardSection = new Section (initialCards, config.cardContainerSelector);
const popupEditProfile = new PopupWithForm(config.popupEditProfileSelector, handleEditProfile, config);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm(config.popupAddCardSelector, handleAddCard, config);
popupAddCard.setEventListeners();
const popupCardZoom = new PopupWithImage(config.popupCardZoomSelector, config);
popupCardZoom.setEventListeners();
cardSection.renderItems();
enableValidation(config);
