export class Card {
  constructor ({ cardTitle, cardImageLink }, cardTemplate, handleCardClick, config) {
    this._title = cardTitle;
    this._image = cardImageLink;
    this._template = cardTemplate;
    this._config = config;
    this._handleCardClick = handleCardClick;
  }

  _getCardFromTemplate () {
    return document.querySelector(this._template).content.cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle(this._config.cardBtnLikeCardActiveted);
  }

  _deleteCard(evt) {
    evt.target.closest(this._config.cardSelector).remove();
  }

  _addEventListeners() {
    this._card.querySelector(this._config.cardSelector).addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._config.cardBtnLikeCard)) {
        this._toggleLike(evt);
      } else if (evt.target.classList.contains(this._config.cardBtnDeleteCard)) {
        this._deleteCard(evt);
      } else if (evt.target.classList.contains(this._config.cardImage)) {
        this._handleCardClick(evt.target, this._title);
      }
    });
  };

  create () {
    this._card = this._getCardFromTemplate();
    const cardTitle = this._card.querySelector(this._config.cardTitleSelector);
    const cardImage = this._card.querySelector(this._config.cardImageSelector);

    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = `Фотография места: ${this._title}`;

    this._addEventListeners();
    return this._card;
  }
};
