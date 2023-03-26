export class UserInfo {
  constructor ({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo () {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo ({ name, about }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
  }

  changeAvatar ({ avatar }) {
    this._userAvatarElement.src = avatar;
  }

  initUser (userData) {
    this.setUserInfo(userData);
    this.changeAvatar(userData);
  }
}
