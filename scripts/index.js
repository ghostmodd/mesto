// значения профиля
const userName = document.querySelector('.profile__user-name');
const userNameInput = document.querySelector('.popup__input_type_user-name');
const userAbout = document.querySelector('.profile__about-user');
const userAboutInput = document.querySelector('.popup__input_type_about-user');

// управление popup`ом
const popup = document.querySelector('.popup');
const buttonShowPopup = document.querySelector('.profile__btn-edit-profile');
const buttonClosePopup = document.querySelector('.popup__btn-close');


// добавить значения к инпутам
function addValuePopup() {
  userNameInput.setAttribute('value', `${userName.textContent}`);
  userAboutInput.setAttribute('value', `${userAbout.textContent}`);
};

// показать или скрыть форму
function callPopup() {
  popup.classList.toggle('popup_opened');
};

// отправка формы
function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
  callPopup();
};

// реализация горячих клавиш
// думаю, в будущем смогу оптимизировать с помощью асинхронного программирования. поставить бы
// цикл какой-нибудь, чтоб Listener ловил события только если popup открыт
function ifHotKeyPressedPopup(evt) {
  debugger
  if (popup.classList.contains('popup_opened') && evt.key === 'Enter') {
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    callPopup();
  }

  else if (popup.classList.contains('popup_opened') && evt.key === 'Escape') {
    callPopup();
  }
};

// Listener`ы и иное взаимодействие с DOM
addValuePopup();
buttonShowPopup.addEventListener('click', callPopup);
popup.addEventListener('submit', submitPopup);
buttonClosePopup.addEventListener('click', callPopup);
document.addEventListener('keydown', ifHotKeyPressedPopup);
