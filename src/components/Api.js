export class Api {
  constructor (cohortID, token) {
    this.cohortID = cohortID;
    this.token = token;
  }

  getProfileData () {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
      headers: {
        authorization: this.token
      }
    }).then(res => {
      if (res.status) {
        console.log(res.json);
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
