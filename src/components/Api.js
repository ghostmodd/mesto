export class Api {
  constructor({ baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getError(res) {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return this._getError(res);
  }

  getProfileData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    })
  }

  editProfileData(userName, userDescription) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${userName}`,
        about: `${userDescription}`
      })
    }).then(res => {
      return this._getJSON(res);
    })
  }

  getInitialCardsData() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    })
  }

  addCard({ cardTitle, cardImageLink }) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardTitle}`,
        link: `${cardImageLink}`
      })
    }).then(res => {
      return this._getJSON(res);
    })
  }

  deleteCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._getError(res);
    })
  }

  likeCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    })
  }

  dislikeCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    })
  }

  changeAvatar(avatarSrc) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarSrc}`
      })
    }).then(res => {
      return this._getError(res);
    })
  }
}
