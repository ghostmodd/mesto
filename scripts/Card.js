import { cards, popupCardZoom, imageCardZoom, captionCardZoom } from './constants.js'

export class Card {
  constructor (cardTitle, cardImage, cardTemplate, config) {
    this._title = cardTitle;
    this._image = cardImage;
    this._template = cardTemplate;
    this._config = config;
  }

  _getCardFromTemplate () {
    return document.querySelector(this._template).content.cloneNode(true);
  }

  _create () {
    this._card = this._getCardFromTemplate();
    const cardTitle = this._card.querySelector(this._config.cardTitleSelector);
    const cardImage = this._card.querySelector(this._config.cardImageSelector);

    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;

    this._addEventListeners();

    return this._card;
  }

  render () {
    cards.prepend(this._create());
  }

  _handleEvents (evt) {
    if (evt.target.classList.contains(this._config.cardBtnLikeCard)) {
      evt.target.classList.toggle(this._config.cardBtnLikeCardActiveted)
    } else if (evt.target.classList.contains(this._config.cardBtnDeleteCard)) {
      evt.target.closest('.card').remove();
    } else if (evt.target.classList.contains(this._config.cardImage)) {
      imageCardZoom.src = this._image;
      imageCardZoom.alt = `Фотография места: ${this._title}`;
      captionCardZoom.textContent = this._title;
      openPopup(popupCardZoom);
    }
  }

  _addEventListeners() {
    this._card.querySelector('.card').addEventListener('click', (evt) => { this._handleEvents(evt) });
  }
};
