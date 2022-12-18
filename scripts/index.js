// значения профиля
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('input[name="user-name"]');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('input[name="about-user"]');

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
function callPopup() {
  if(!popup.classList.contains('popup_opened')) {
    addValuePopup();
    popup.classList.add('popup_opened');
  } else {
    popup.classList.remove('popup_opened');
  }
};

// отправка формы
function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
  callPopup();
};

// Listener`ы и иное взаимодействие с DOM
buttonShowPopup.addEventListener('click', callPopup);
formEditProfile.addEventListener('submit', submitPopup);
buttonClosePopup.addEventListener('click', callPopup);
