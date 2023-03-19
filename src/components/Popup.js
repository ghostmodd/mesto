export class Popup {
  constructor (popupSelector, config) {
    this._config = config;
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._btnClosePopup = this._popupElement.querySelector(this._config.buttonClosePopupSelector);
  }

  openPopup () {
    this._popupElement.classList.add(this._config.popupOpenedClass);
    document.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });
  }

  closePopup () {
    this._popupElement.classList.remove(this._config.popupOpenedClass);
    document.removeEventListener('keydown', (evt) => { this._handleEscClose(evt) });
  }

  _handleEscClose (evt) {
    if (evt.key == 'Escape') {
      this.closePopup();
    };
  }

  setEventListeners () {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target == this._popupElement) {
        this.closePopup();
      } else if (evt.target == this._btnClosePopup) {
        this.closePopup();
      }
    });
  }
}
