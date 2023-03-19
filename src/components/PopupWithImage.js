import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector, config) {
    super(popupSelector, config);
    this._popupImage = this._popupElement.querySelector('.card-zoom__image');
    this._popupCaption = this._popupElement.querySelector('.card-zoom__caption');
  }

  openPopup (imgElement, caption) {
    this._imgElement = imgElement;
    this._popupImage.src = this._imgElement.src;
    this._popupImage.alt = this._imgElement.alt;
    this._popupCaption.textContent = caption;
    super.openPopup();
  }
}
