export class Card {
  constructor (cardTitle, cardImage, cardTemplate, cardsContainer, handleCardClick, config) {
    this._cardsContainer = cardsContainer;
    this._title = cardTitle;
    this._image = cardImage;
    this._template = cardTemplate;
    this._config = config;
    this._handleCardClick = handleCardClick;
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
    this._cardsContainer.prepend(this._create());
  }

  _addEventListeners() {
    this._card.querySelector('.card').addEventListener('click', (evt) => { this._handleCardClick(evt, this._title, this._image) });
  }
};
