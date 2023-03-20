export class Popup {
  constructor (popupSelector, config) {
    this._config = config;
    this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(popupSelector);
    this._btnClosePopup = this.popupElement.querySelector(this._config.buttonClosePopupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup () {
    this.popupElement.classList.add(this._config.popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup () {
    this.popupElement.classList.remove(this._config.popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key == 'Escape') {
      this.closePopup();
    };
  }

  setEventListeners () {
    this.popupElement.addEventListener('click', (evt) => {
      if (evt.target == this.popupElement) {
        this.closePopup();
      } else if (evt.target == this._btnClosePopup) {
        this.closePopup();
      }
    });
  }
}
