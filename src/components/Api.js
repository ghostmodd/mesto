export class Api {
  constructor({ baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getError(res) {
    if(!res.status) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _getJSON(res) {
    if (res.status) {
      return res.json();
    }
    this._getError(res);
  }

  getProfileData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    }).catch(err => {
      console.log(err);
    });
  }

  editProfileData(userName, userDescription, submitButton) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${userName}`,
        about: `${userDescription}`
      })
    }).then(res => {
      this._getError(res);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      submitButton.textContent = 'Cохранить';
    });
  }

  getInitialCardsData() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    }).catch(err => {
      console.log(err);
    }).then(res => {
      return res.reverse();
    });
  }

  addCard({ cardTitle, cardImageLink }, submitButton) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardTitle}`,
        link: `${cardImageLink}`
      })
    }).then(res => {
      return this._getJSON(res);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      submitButton.textContent = 'Создать';
    });
  }

  deleteCard(cardID, submitButton) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      this._getError(res);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      submitButton.textContent = 'Да';
    });
  }

  likeCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    }).catch(err => {
      console.log(err);
    });
  }

  dislikeCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._getJSON(res);
    }).catch(err => {
      console.log(err);
    });
  }

  changeAvatar(avatarSrc, submitButton) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarSrc}`
      })
    }).then(res => {
      return this._getError(res);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      submitButton.textContent = 'Сохранить';
    });
  }
}
