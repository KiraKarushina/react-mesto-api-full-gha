class Auth {
    constructor (options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    register(data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        }).then(res => {return this.handleResponse(res)})
    };


    authorize(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        }).then(res => {return this.handleResponse(res)})
    };

    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...this._headers,
            }
        }).then(res => {return this.handleResponse(res)})
    };
}

const auth = new Auth({
    url: 'https://backend.nomoredomains.monster',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default auth;
