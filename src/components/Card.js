export class Card {
  constructor({ _id, name, link, likes, owner }, currentUserID, cardTemplate, handleCardClick, handleDeleteCard, handleLikeCard, config) {
    this._userID = currentUserID;
    this._cardID = _id;
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._numberOfLikes = this._likes.length;
    this._isLiked = this._checkIsLiked();
    this._cardOwnerID = owner._id;
    this._template = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._config = config;

    this._card = this._getCardFromTemplate();
    this._cardElement = this._card.querySelector('.card');
    this._cardTitle = this._card.querySelector(this._config.cardTitleSelector);
    this._buttonDeleteCard = this._card.querySelector('.card__btn-delete-card');
    this._cardImage = this._card.querySelector(this._config.cardImageSelector);
    this._buttonLikeCard = this._card.querySelector(this._config.cardBtnLikeCardSelector);
    this._likesSignature = this._card.querySelector('.card__number-of-likes');
  }

  _getCardFromTemplate() {
    return document.querySelector(this._template).content.cloneNode(true);
  }

  _checkIsLiked() {
    if (this._likes.some((user) => {
      return this._userID === user._id;
    })) {
      return true;
    }
  }

  _powerLikeButton() {
    if (this._isLiked) {
      this._buttonLikeCard.classList.add(this._config.cardBtnLikeCardActiveted);
    } else {
      this._buttonLikeCard.classList.remove(this._config.cardBtnLikeCardActiveted);
    }
  }

  refreshLikesData({ likes }) {
    this._likes = likes;
    this._numberOfLikes = this._likes.length;
    this._likesSignature.textContent = this._numberOfLikes;
    this._powerLikeButton();
  }

  _powerDeleteCardButton() {
    if (this._userID == this._cardOwnerID) {
      this._buttonDeleteCard.classList.add('card__btn-delete-card_visible');
    }
  }

  _deleteCard () {
    this._cardElement.remove();
  }

  _addEventListeners() {
    this._card.querySelector(this._config.cardSelector).addEventListener('click', (evt) => {
      if (evt.target == this._buttonLikeCard) {
        this._isLiked = !this._isLiked;
        this._handleLikeCard(this._cardID, this._isLiked, this.refreshLikesData.bind(this));
      } else if (evt.target == this._buttonDeleteCard) {
        this._handleDeleteCard(this._deleteCard.bind(this), this._cardID);
      } else if (evt.target.classList.contains(this._config.cardImage)) {
        this._handleCardClick(evt.target, this._title);
      }
    });
  };

  create() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Фотография: ${this._title}`;
    this._likesSignature.textContent = this._numberOfLikes;

    this._powerDeleteCardButton();
    this._powerLikeButton();
    this._addEventListeners();
    return this._card;
  }
};
