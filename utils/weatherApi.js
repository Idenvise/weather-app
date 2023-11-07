const config = {
    baseUrl: 'http://api.openweathermap.org',
    key: 'a297cc437b0b24e2bfd38cbe163681be'
  }

class Api {
    constructor(config) {
      this.url = config.baseUrl;
      this.key = config.key;
    }
  
    getCityСoordinates(city) {
        return fetch(`${this.url}/geo/1.0/direct?q=${city},643&limit=5&appid=${this.key}`)
          .then(res => { return this._checkResponse(res) })
    }
    getWeather(lat, lon) {
        return fetch(`${this.url}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.key}&lang=ru&units=metric`)
          .then(res => { return this._checkResponse(res) })
    }
    _checkResponse(res) {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const weatherApi = new Api(config);