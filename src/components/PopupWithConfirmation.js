import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor (popupSelector, handleConfirm, config) {
    super(popupSelector, config);
    this._handleConfirm = handleConfirm;
    this._form = this.popupElement.querySelector(this._config.formSelector);
    this._submitButton = this._form.querySelector('.form__btn-submit');
  }

  openPopup (data) {
    super.openPopup();
    this._data = data;
  }

  changeSubmitButtonText (text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleConfirm(evt, this._data, this._submitButton));
  }
}
