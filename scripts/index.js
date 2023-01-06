// значения профиля
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.edit-profile__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.edit-profile__input_type_about-user');

// взаимодействие с карточкой
const buttonLikeCard = document.querySelectorAll('.cards__btn-like-card');

// поставить или убрать лайк
buttonLikeCard.forEach(elem => {
  elem.addEventListener('click', evt => {
    evt.target.classList.toggle('cards__btn-like-card_activated');
  })
});

// управление popup`ом
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.edit-profile');
const buttonShowPopup = document.querySelector('.profile__btn-edit-profile');
const buttonClosePopup = document.querySelector('.edit-profile__btn-close');

// добавить значения к инпутам
function addValuePopup() {
  userNameInput.value = `${userName.textContent}`;
  userAboutInput.value = `${userAbout.textContent}`;
};

// показать форму
function openPopup(popupElement) {
  addValuePopup();
  popupElement.style.visibility = 'visible';
  popupElement.style.opacity = '1';
};

// скрыть форму
function closePopup(popupElement) {
  popupElement.style.opacity = '0';
  setTimeout(() => {popupElement.style.visibility = 'hidden'}, 100);
}

// отправка формы
function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
  closePopup(popupEditProfile);
};

// Listener`ы и иное взаимодействие с DOM
buttonShowPopup.addEventListener('click', () => { openPopup(popupEditProfile) });
formEditProfile.addEventListener('submit', submitPopup);
buttonClosePopup.addEventListener('click', () => { closePopup(popupEditProfile) });
