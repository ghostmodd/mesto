import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmitForm, config) {
    super(popupSelector, config);
    this._form = this.popupElement.querySelector(this._config.formSelector);
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  closePopup () {
    super.closePopup();
    this._form.reset();
  }

  _getInputValues () {
    const values = {}
    this._inputList.forEach(item => {
      values[item.name] = item.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmitForm(evt, this._getInputValues()));
  }
}