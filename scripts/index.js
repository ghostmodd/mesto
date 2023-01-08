// значения профиля
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.form__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.form__input_type_about-user');

// элементы карточки
const cardsContainer = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Кнопка закрытия popup
let whatPopupIsOpened = '';
const buttonClosePopup = document.querySelectorAll('.form__btn-close');

// EDIT-PROFILE
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.form_edit-profile');
const buttonShowPopup = document.querySelector('.profile__btn-edit-profile');

// ADD-CARD
const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = document.querySelector('.form_add-card');
const buttonAddCard = document.querySelector('.profile__btn-add-card');
const cardTitleInput = formAddCard.querySelector('.form__input_type_card-title');
const cardImageLinkInput = formAddCard.querySelector('.form__input_type_image-link');

// добавить значения к инпутам
function addValuePopup() {
  userNameInput.value = `${userName.textContent}`;
  userAboutInput.value = `${userAbout.textContent}`;
};

// показать форму
function openPopup(popupElement) {
  popupElement.style.visibility = 'visible';
  popupElement.style.opacity = '1';
  whatPopupIsOpened = popupElement;
};

// скрыть форму
function closePopup(popupElement = whatPopupIsOpened) {
  popupElement.style.opacity = '0';
  setTimeout(() => { popupElement.style.visibility = 'hidden' }, 100);
}

// отправка формы
function submitPopup(evt) {
  evt.preventDefault();
  closePopup();
};

// сохранить данные для профиля
function saveProfileData() {
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
};

// обнулить value для инпутов формы
function nullifyFormValue(popupElement) {
  const formElement = popupElement.querySelectorAll('.form__input');
  formElement.forEach((item) => { item.value = '' });
};

function renderCard(elem) {
  const cardTemplate = document.querySelector('#card').content.querySelector('.card').cloneNode(true);
  const cardTitle = cardTemplate.querySelector('.card__title');
  const cardImage = cardTemplate.querySelector('.card__image');
  const buttonLikeCard = cardTemplate.querySelector('.card__btn-like-card');
  cardImage.src = elem.link;
  cardImage.alt = `Фотография места "${elem.name}"`;
  cardTitle.textContent = elem.name;
  cardsContainer.prepend(cardTemplate);
  buttonLikeCard.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn-like-card_activated')
  });
};

function initCards() {
  initialCards.forEach(elem => { renderCard(elem) });
};

function addCard() {
  initialCards.push({
    name: cardTitleInput.value,
    link: cardImageLinkInput.value,
  });
  renderCard(initialCards[initialCards.length - 1]);
}


initCards();
// Listener`ы и иное взаимодействие с DOM
buttonClosePopup.forEach(elem => {
  elem.addEventListener('click', () => { closePopup() });
});


buttonShowPopup.addEventListener('click', () => {
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
  addCard();
});
