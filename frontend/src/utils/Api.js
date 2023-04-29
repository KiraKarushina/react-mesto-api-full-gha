import { myID } from "./constants.js";

class Api {
  constructor({ userID, group, url }) {
    return (this._userID = userID), (this._group = group), (this._url = url);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  updateProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
      credentials: 'include'
    }).then((response) => {
      return this._getResponseData(response);
    });
  }
}

const api = new Api({
  userID: myID,
  group: "",
  url: "https://backend.nomoredomains.monster",
});

export default api;
