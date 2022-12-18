// значения профиля
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.edit-profile__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.edit-profile__input_type_about-user');

// управление popup`ом
const popup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.edit-profile');
const buttonShowPopup = document.querySelector('.profile__btn-edit-profile');
const buttonClosePopup = document.querySelector('.edit-profile__btn-close');


// добавить значения к инпутам
function addValuePopup() {
  userNameInput.value = `${userName.textContent}`;
  userAboutInput.value = `${userAbout.textContent}`;
};

// показать или скрыть форму
function openPopup() {
  addValuePopup();
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
}

// отправка формы
function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
  closePopup()
};

// Listener`ы и иное взаимодействие с DOM
buttonShowPopup.addEventListener('click', openPopup);
formEditProfile.addEventListener('submit', submitPopup);
buttonClosePopup.addEventListener('click', closePopup);
