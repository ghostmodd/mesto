export class UserInfo {
  constructor ({ userName, userDescription }) {
    this._userNameElement = document.querySelector(userName);
    this._userDescriptionElement = document.querySelector(userDescription);
  }

  getUserInfo () {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo (newUserName, newUserDescription) {
    this._userNameElement.textContent = newUserName;
    this._userDescriptionElement.textContent = newUserDescription;
  }
}
